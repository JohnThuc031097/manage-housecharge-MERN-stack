import React, { useContext, useReducer, useEffect } from "react";
// AntD
import {
    notification,
    Form, DatePicker, Button,
    Row, Col,
} from "antd";
// Context
import { StatusContext } from "../../../contexts";
// Reducer
import { TabYearReducer } from "../../../reducers/HouseCharge/ImportData";
// Utils
import { Validator } from "../../../utils";

export default function TabYear() {
    // States
    // Contexts
    const { setStatusLoading } = useContext(StatusContext.Loading);
    // Hooks
    const [form] = Form.useForm();
    // Reducers
    const [state, dispatch] = useReducer(TabYearReducer, {});
    // Effects
    useEffect(() => {
        if (state instanceof Promise) {
            state.then(valueState => {
                if (Object.keys(valueState).length > 0) {
                    if (valueState['add']?.message?.type) {
                        notification[valueState['add']?.message?.type]({
                            message: valueState['add'].message.title,
                            description: valueState['add'].message.description,
                            duration: valueState['add'].message.duration,
                        });
                        setStatusLoading(false);
                    }
                }
            })
        }
    }, [state]);
    return (
        <Form
            className="tab-year__form-input"
            form={form}
            size="large">
            <Row className="mr-top-20" align="top">
                <Col span={4} offset={1}>
                    <Form.Item
                        className="form-input__item"
                        name="dateTabYear"
                        label="Year"
                        labelAlign={{ span: 2 }}
                        rules={[
                            () => ({
                                validator(_, value) {
                                    return Validator.validatorRequired('Năm', value);
                                },
                            }),
                        ]}
                        required>
                        <DatePicker picker="year" />
                    </Form.Item>
                </Col>
                <Col span={2} offset={1}>
                    <Form.Item className="form-input__item">
                        <Button
                            className="w-full"
                            size="large"
                            htmlType="submit"
                            type="primary"
                            onClick={() => {
                                setStatusLoading(true);
                                dispatch({
                                    type: 'add',
                                    payload: {
                                        validateFields: () => form.validateFields()
                                    }
                                })
                            }}>
                            Add
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}