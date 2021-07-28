import { BillModel } from "../models/bill.model.js";


const BillController = {
    // [GET] /bill
    get(req, res, next) {
        return res.json('This is a bill page!')
    },
    add(req, res, next) {
        const values = req.body;
        console.log(values);
        return res.status(200).send(`Bill ${values.bill} đã được thêm vào dữ liệu server`);
    },
    // [POST] /bill/
    upload(req, res, next) {
        const file = req.file;
        console.log(file);
        /*
        const data = [
            {
                date: '06/04/2021',
                status: true,
                till: '1253',
                bill: '1200',
                cash: '05',
                currency: '120.500',
                address: '101/5E Tan Tien, X.Xuân Thởi Đông, H.Hóc Môn, TP.HCM'
            },
            {
                date: '08/06/2021',
                status: true,
                till: '1253',
                bill: '1000',
                cash: '06',
                currency: '333.500',
                address: '101/5E Tan Tien, X.Xuân Thởi Đông, H.Hóc Môn, TP.HCM'
            },
            {
                date: '04/05/2020',
                status: false,
                till: '1111',
                bill: '4808',
                cash: '01',
                currency: '356.820',
                address: '101/5E Tan Tien, X.Xuân Thởi Đông, H.Hóc Môn, TP.HCM'
            },
            {
                date: '02/06/2021',
                status: true,
                till: '1624',
                bill: '1422',
                cash: '10',
                currency: '520.000',
                address: '101/5E Tan Tien, X.Xuân Thởi Đông, H.Hóc Môn, TP.HCM'
            },
            {
                date: '06/05/2020',
                status: true,
                till: '1355',
                bill: '1300',
                cash: '21',
                currency: '1.000.000.000',
                address: 'TOA NHA SO 10 DUONG SO 4 KHU PHAN MEN QUANG TRUNG P. TAN CHANH HIEP Q12 P. TAN CHANH HIEP Q12 P. TAN CHANH HIEP Q12 P. TAN CHANH HIEP Q12'
            },
            {
                date: '10/08/2021',
                status: false,
                till: '1355',
                bill: '1300',
                cash: '21',
                currency: '1.000.000.000',
                address: 'BVDK MY DUC PHU NHUAN 43R/2-43R/4 HO VAN HUE P9 PHU NHUAN'
            },
            {
                date: '18/02/2020',
                status: false,
                till: '1355',
                bill: '1300',
                cash: '21',
                currency: '1.000.000.000',
                address: '97B QUANG TRUNG P8 QUAN GO VAP TRUONG MAM NON VIET MY'
            },
            {
                date: '06/04/2021',
                status: true,
                till: '1355',
                bill: '1300',
                cash: '21',
                currency: '1.000.000.000',
                address: '183/36/32 NGUYEN VAN KHOI (CAY TRAM) F8 QGV'
            }
        ];
        
        BillModel.insertMany(data, (err) => {
            if (err) {
                console.log(err);
                res.json('Insert FAILED')
            } else {
                res.json('Insert OK');
            }
        });
        */
    }


}

export default BillController;