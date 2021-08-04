import { BillModel } from "../models/bill.model.js";


const BillController = {
    // [GET] /bill
    get(req, res, next) {
        return res.json('This is a bill page!')
    },
    add(req, res, next) {
        const data = req.data;
        if (!data) {
            console.log(`[Controller] => [bill] => [add] => Duplicate`);
            res.json({
                isExist: true,
                message: `Dữ liệu thêm mới đã tồn tại`
            });
        } else {
            new BillModel(data).save()
                .then(_ => {
                    console.log(`[Controller] => [bill] => [add] => Success`);
                    res.json({
                        isSuccess: true,
                        message: 'Thêm dữ liệu mới thành công'
                    });
                }).catch(error => {
                    console.log('[Error] => [Controller] => [bill] => [Add]:', error);
                    res.json({
                        isError: true,
                        error: 'Thêm dữ liệu mới thất bại'
                    });
                })
        }
    },
    // [POST] /bill/
    async uploadFile(req, res, next) {
        const data = req.data;
        if (data.length > 0) {
            try {
                // await BillModel.insertMany(data);
            } catch (error) {
                console.log('[Error] => [Controller] => [bill] => [uploadFile]:', error);
                res.json({
                    isError: true,
                    error: 'Upload dữ liệu thất bại'
                });
            }
            console.log(`[Controller] => [uploadFile] => [bill] => ${data.length} Success`);
        } else {
            console.log('[Controller] => [uploadFile] => [bill] => Duplicate');
        }
        res.json({
            isSuccess: true,
            message: 'Upload dữ liệu thành công'
        });
    }
}

export default BillController;