// Service
import { HouseChargeServices } from "../../../services";
// Excel
import * as XLSX from "xlsx";

const stateInit = {
    add: {
        message: {
            title: 'Thêm dữ liệu',
            duration: 1.5
        }
    },
    upload: {
        message: {
            title: 'Upload dữ liệu',
            duration: 1.5
        }
    }
};

const getDataFromFileExcel = (file) => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, { header: 0 });
                resolve(data);
            }
            reader.readAsBinaryString(file);
        } catch (error) {
            reject(error);
        }
    })
}

const addKeyData = (data) => {
    return {
        ...data,
        // Formula Time Excel: (serial - 25569) * 86400;
        key: `${(data.date - 25569) * 86400}-${data.till}-${data.bill}-${data.cash}`,
    }
}

const reducer = async (state, action) => {
    switch (action['type']) {
        case 'add':
            try {
                const valueFields = await action['payload'].validateFields();
                const valueNewFields = {
                    ...valueFields,
                    date: valueFields.date.unix(),
                    key: `${valueFields.date.unix()}-${valueFields.bill}-${valueFields.till}-${valueFields.cash}`,
                }
                try {
                    const res = await HouseChargeServices.Bill.add(valueNewFields);
                    stateInit['add'].message = {
                        ...stateInit['add'].message,
                        type: res.data.type,
                        description: res.data.description
                    }
                } catch (error) {
                    console.log('reducer -> TabBill -> action["add"] -> error', error);
                    stateInit['add'].message = {
                        ...stateInit['add'].message,
                        type: 'error',
                        description: 'Thêm mới dữ liệu thất bại'
                    }
                }
            } catch (error) {
                // Missing Info Field
                console.log('reducer -> TabBill -> action["add"] -> error', error);
                stateInit['add'].message = {
                    ...stateInit['add'].message,
                    type: 'error',
                    description: 'Vui lòng điền đầy đủ thông tin'
                }
            }
            break;
        case 'upload':
            try {
                const dataFile = await getDataFromFileExcel(action['payload'].file);
                // console.log('reducer -> TabBill -> action["upload"] -> dataFile', dataFile);
                const limitOneUpload = Number(action['payload'].limitOneUpload);
                for (let i = (dataFile.length - 1); i > -1; i = (i - limitOneUpload)) {
                    let dataLimitUpload = [];
                    const startForAddKey = i;
                    const endForAddKey = (i - limitOneUpload) > 0 ? (i - limitOneUpload) : 0;
                    for (let j = startForAddKey; j > endForAddKey; j--) {
                        dataLimitUpload.push(addKeyData(dataFile[j]));
                    }
                    // console.log('reducer -> TabBill -> action["upload"] -> dataLimitUpload', dataLimitUpload);
                    try {
                        const res = await HouseChargeServices.Bill.uploadFile(dataLimitUpload);
                        stateInit['upload'].message = {
                            ...stateInit['upload'].message,
                            type: res.data.type,
                            description: res.data.description
                        }
                    } catch (error) {
                        console.log('reducer -> TabBill -> action["upload"] -> error_2:', error);
                        stateInit['upload'].message = {
                            ...stateInit['upload'].message,
                            type: 'error',
                            description: 'Có lỗi xảy ra trong quá trình upload'
                        }
                        break;
                    }
                }
            } catch (error) {
                console.log('reducer -> TabBill -> action["upload"] -> error_1:', error);
                stateInit['upload'].message = {
                    ...stateInit['upload'].message,
                    type: 'error',
                    description: 'Có lỗi xảy ra trong quá trình upload'
                }
            }

            break;
        case 'refresh':
            action.refreshForm();
            break;

        default:
            break;
    }
    // console.log('reducer', stateInit);
    return stateInit;
}

export default reducer;