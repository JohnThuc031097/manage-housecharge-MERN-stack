// Service
import { HouseChargeServices } from "../../../services";

const stateInit = {
    add: {
        message: {
            title: 'Thêm dữ liệu',
            duration: 1.5
        }
    },
};


const reducer = async (state, action) => {
    switch (action['type']) {
        case 'add':
            try {
                const valueFields = await action['payload'].validateFields();
                console.log(valueFields.format('YYYY'));
                // try {
                //     const res = await HouseChargeServices.Year.add(valueFields);
                //     stateInit['add'].message = {
                //         ...stateInit['add'].message,
                //         type: res.data.type,
                //         description: res.data.description
                //     }
                // } catch (error) {
                //     console.log('reducer -> TabYear -> action["add"] -> error', error);
                //     stateInit['add'].message = {
                //         ...stateInit['add'].message,
                //         type: 'error',
                //         description: 'Thêm mới dữ liệu thất bại'
                //     }
                // }
            } catch (error) {
                // Missing Info Field
                console.log('reducer -> TabYear -> action["add"] -> error', error);
                stateInit['add'].message = {
                    ...stateInit['add'].message,
                    type: 'error',
                    description: 'Vui lòng điền đầy đủ thông tin'
                }
            }
            break;

        default:
            break;
    }
    // console.log('reducer', stateInit);
    return stateInit;
}

export default reducer;