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
                type: 'warn',
                description: `Dữ liệu thêm mới đã tồn tại`
            });
        } else {
            new BillModel(data).save()
                .then(_ => {
                    console.log(`[Controller] => [bill] => [add] => Success`);
                    res.json({
                        type: 'success',
                        description: 'Thêm dữ liệu mới thành công'
                    });
                }).catch(error => {
                    console.log('[Error] => [Controller] => [bill] => [Add]:', error);
                    res.json({
                        type: 'error',
                        description: 'Thêm dữ liệu mới thất bại'
                    });
                })
        }
    },
    // [POST] /bill/
    async uploadFile(req, res, next) {
        const data = req.data;
        if (data.length > 0) {
            try {
                await BillModel.insertMany(data);
                console.log(`[Controller] => [uploadFile] => [bill] => ${data.length} Success`);
            } catch (error) {
                console.log('[Error] => [Controller] => [bill] => [uploadFile]:', error);
                res.json({
                    type: 'error',
                    description: 'Upload dữ liệu thất bại'
                });
            }
        } else {
            console.log('[Controller] => [uploadFile] => [bill] => Duplicate');
        }
        res.json({
            type: 'success',
            description: 'Upload dữ liệu thành công'
        });
    }
}

export default BillController;