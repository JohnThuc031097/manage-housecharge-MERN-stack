import { YearModel } from "../models/year.model.js";


const YearController = {
    // [GET] /year
    get(req, res, next) {
        return res.json('This is a bill page!')
    },
    // [POST] /year/add
    add(req, res, next) {
        const data = req.data;
        if (!data) {
            console.log(`[Controller] => [year] => [add] => Duplicate`);
            res.json({
                isExist: true,
                message: 'Dữ liệu thêm mới đã tồn tại'
            });
        } else {
            new YearModel(data).save()
                .then(_ => {
                    console.log(`[Controller] => [year] => [add] => Success`);
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
    }
}

export default YearController;