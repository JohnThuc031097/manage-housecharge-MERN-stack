import { YearModel } from "../../models/year.model.js";

const filterExist = async (req, res, next) => {
    const data = req?.body;
    req.data = null;
    if (data) {
        try {
            const isExist = await YearModel.exists({ key: data.key });
            if (!isExist)
                req.data = data;
            next();
        } catch (err) {
            console.log('[Error] => [Midleware] => [year] => filterExist');
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
}