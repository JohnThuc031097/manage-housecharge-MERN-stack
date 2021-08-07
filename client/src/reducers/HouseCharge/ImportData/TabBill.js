// Service
import { HouseChargeServices } from "../../../services";


const reducer = async (state, action) => {
    console.log('beforReducer', state);
    if (action.type === 'add') {
        try {
            state.statusLoading = true;
            const valueFields = await action.validateFields();
            const valueFieldsNew = {
                ...valueFields,
                date: valueFields.date.unix(),
                key: `${valueFields.date.unix()}-${valueFields.bill}-${valueFields.till}-${valueFields.cash}`,
            }
            try {
                const response = await HouseChargeServices.Bill.add(valueFieldsNew);
                state.message = {
                    type: response.data.type,
                    description: response.data.description
                }
            } catch (error) {
                // Error
                state.message = {
                    type: 'error',
                    description: error
                };
            }
        } catch (error) {
            // Missing Info Field
            state.message = {
                type: 'error',
                description: 'Vui lòng điền đầy đủ thông tin'
            };
        }
    }
    state.statusLoading = false;
    console.log('afterReducer', state);
    return { ...state };
    /*
    switch (action.type) {
        case 'add':
            console.log('reducer', state);
            state.statusLoading = true;
            try {
                const validateFields = await state.form.validateFields();
                const resultFields = {
                    ...validateFields.values,
                    date: validateFields.values.date.unix(),
                    key: `${validateFields.values.date.unix()}-${validateFields.values.bill}-${validateFields.values.till}-${validateFields.values.cash}`,
                }
                try {
                    const response = await state.api.add(resultFields);
                    const resultAPI = response.data;
                    state.message = resultAPI.message;
                    if (resultAPI.message === 'success') {
                        state.form.resetFields();
                    }
                } catch (error) {
                    // Error
                    state.message = {
                        type: 'error',
                        description: error
                    };
                }
            } catch (error) {
                // Missing Info Field
                // console.log(errorInfo);
                state.message = {
                    type: 'error',
                    description: 'Vui lòng điền đầy đủ thông tin'
                };
            }
            state.statusLoading = false;
            return state;
        case 'upload':

            break;
        case 'refresh':

            break;

        default:
            break;
    }
    */
}

export default reducer;