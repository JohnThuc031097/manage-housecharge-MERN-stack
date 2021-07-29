import { BillModel } from "../models/bill.model.js";


const BillController = {
    // [GET] /bill
    get(req, res, next) {
        return res.json('This is a bill page!')
    },
    add(req, res, next) {
        const data = req?.body;
        if (data) {
            BillModel.findOne({ key: data.key })
                .then(docBill => {
                    if (docBill) {
                        res.json({
                            isError: false,
                            isExist: true,
                            message: `Bill ${data.bill} đã tồn tại`
                        });
                    } else {
                        new BillModel(data).save()
                            .then(_ => {
                                res.json({
                                    isError: false,
                                    isExist: false,
                                    message: `Bill ${data.bill} thêm mới thành công`
                                });
                            }).catch(_ => {
                                res.json({
                                    isError: true,
                                    isExist: false,
                                    message: `Bill ${data.bill} thêm mới thất bại`,
                                });
                            })
                    }
                }).catch(err => {
                    res.json({
                        isError: true,
                        isExist: false,
                        message: `Bill ${data.bill} thêm mới thất bại`,
                        logError: err
                    });
                })
        }
    },
    // [POST] /bill/
    uploadFile(req, res, next) {
        const data = req?.body;
        let countSaved = 0;
        // console.log(data);
        if (Array.isArray(data) && data.length > 0) {
            data.map(async (arr) => {
                const billExist = await BillModel.exists({ key: arr.key });
                if (!billExist) {
                    const result = await new BillModel(arr).save();
                    if (result) countSaved++;
                    console.log(countSaved);
                }
            });
        }
        console.log('???');
        res.json({
            count: countSaved
        })
    }
}

export default BillController;