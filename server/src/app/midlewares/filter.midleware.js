import { BillModel } from "../models/bill.model.js";

const filterExist = async (req, res, next) => {
    const data = req?.body;
    req.data = null;
    if (data) {
        try {
            const isExist = await BillModel.exists({ key: data.key });
            if (!isExist)
                req.data = data;
            next();
        } catch (err) {
            console.log('[Error] => [Midleware] => filterExist');
            res.json({
                isError: true,
                error: 'Lỗi hệ thống'
            })
        }
    } else {
        res.json({
            isError: true,
            error: 'Dữ liệu sai định dạng'
        })
    }
}

const filterExists = async (req, res, next) => {
    const data = req?.body;
    req.data = [];
    if (Array.isArray(data) && data.length > 0) {
        try {
            for (const item of data) {
                const isExist = await BillModel.exists({ key: item.key });
                if (!isExist) req.data.push(item);
            }
            next();
        } catch (err) {
            console.log('[Error] => [Midleware] => filterExists');
            res.json({
                isError: true,
                error: 'Lỗi hệ thống'
            })
        }
    } else {
        res.json({
            isError: true,
            error: 'Dữ liệu sai định dạng'
        })
    }
}

export {
    filterExist,
    filterExists,
}