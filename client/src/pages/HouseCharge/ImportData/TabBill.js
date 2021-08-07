import React, {
    useReducer,
    useState,
    useContext,
    useEffect
} from "react";
// AntD
import {
    Form, DatePicker, Input, Button, Upload,
    Col, Row, notification
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
// Context
import { StatusContext } from "../../../contexts";
// Services
import { HouseChargeServices } from "../../../services";
// Reducer
import { TabBillReducer } from "../../../reducers/HouseCharge/ImportData";
// Utils
import { Validator } from "../../../utils";

export default function TabBill() {
    // States
    // Contexts
    const { setStatusLoading } = useContext(StatusContext.Loading);
    // Hooks
    const [form] = Form.useForm();
    // Reducers
    const [state, dispatch] = useReducer(TabBillReducer, {
        message: {
            title: 'Thêm dữ liệu',
            description: '',
            duration: 1.5
        }
    });
    // Effects
    useEffect(() => {
        console.log(state);
        if (state instanceof Promise) {
            state.then(_state => {
                console.log('useEffect', _state);
                setStatusLoading(_state.statusLoading);
                notification[_state.message.type]({
                    message: _state.message.title,
                    description: _state.message.description,
                    duration: _state.message.duration
                });
            })
        }
    }, [state]);

    return (
        <Form
            className="tab-bill__form-input"
            form={form}
            size="large">
            <Row
                className="mr-top-30"
                align="top">
                <Col
                    span={4}
                    offset={1}>
                    <Form.Item
                        className="form-input__item"
                        name="date"
                        label="Date"
                        labelAlign={{ span: 2 }}
                        rules={[
                            () => ({
                                validator(_, value) {
                                    return Validator.validatorRequired('Ngày', value);
                                },
                            }),
                        ]}
                        required>
                        <DatePicker className="mr-left-20" />
                    </Form.Item>
                </Col>
                <Col
                    span={3}
                    offset={1}>
                    <Form.Item
                        className="form-input__item"
                        name="till"
                        label="Till"
                        hasFeedback
                        rules={[
                            () => ({
                                validator(_, value) {
                                    return Validator.validatorNumber('Mã thu ngân', value, 1, 99999);
                                },
                            }),
                        ]}
                        required>
                        <Input />
                    </Form.Item>
                </Col>
                <Col
                    span={3}
                    offset={1}>
                    <Form.Item
                        className="form-input__item"
                        name="bill"
                        label="Bill"
                        hasFeedback
                        rules={[
                            () => ({
                                validator(_, value) {
                                    return Validator.validatorNumber('Số hóa đơn', value, 1, 99999);
                                },
                            }),
                        ]}
                        required>
                        <Input />
                    </Form.Item>
                </Col>
                <Col
                    span={3}
                    offset={1}>
                    <Form.Item
                        className="form-input__item"
                        name="cash"
                        label="Cash"
                        hasFeedback
                        rules={[
                            () => ({
                                validator(_, value) {
                                    return Validator.validatorNumber('Số quầy', value, 1, 99);
                                },
                            }),
                        ]}
                        required>
                        <Input />
                    </Form.Item>
                </Col>
                <Col
                    span={5}
                    offset={1}>
                    <Form.Item
                        className="form-input__item"
                        name="price"
                        label="Price"
                        hasFeedback
                        rules={[
                            () => ({
                                validator(_, value) {
                                    return Validator.validatorNumber('Số tiền', value, 1, 9999999999);
                                },
                            }),
                        ]}
                        required>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row
                className="mr-top-20"
                align="top">
                <Col
                    span={13}
                    offset={1}>
                    <Form.Item
                        className="form-input__item"
                        name="address"
                        label="Address"
                        wrapperCol={{ span: 20 }}
                        rules={[
                            () => ({
                                validator(_, value) {
                                    return Validator.validatorRequired('Địa chỉ', value);
                                },
                            }),
                        ]}
                        required>
                        <Input.TextArea
                            rows={4}
                            placeholder="Nhập địa chỉ thanh toán"
                        />
                    </Form.Item>
                </Col>
                <Col
                    span={9}>
                    <Form.Item
                        className="form-input__item"
                        name="note"
                        label="Notes"
                        wrapperCol={{ span: 26 }}>
                        <Input.TextArea
                            rows={4}
                            placeholder="Nhập thêm ghi chú (Nếu cần)"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row
                className="mr-top-20"
                justify="end"
                align="top">
                <Col
                    span={2}>
                    <Form.Item
                        className="form-input__item">
                        <Button
                            className="w-full"
                            htmlType="reset"
                            size="large"
                            onClick={() => dispatch({ type: 'refresh' })}>
                            Refresh
                        </Button>
                    </Form.Item>
                </Col>
                <Col
                    span={2}
                    offset={1}>
                    <Form.Item
                        className="form-input__item">
                        <Upload
                            accept=".xlsx"
                            maxCount={1}
                            showUploadList={false}
                            beforeUpload={() => dispatch({ type: 'upload' })}>
                            <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                    </Form.Item>
                </Col>
                <Col
                    span={2}
                    offset={1}>
                    <Form.Item className="form-input__item">
                        <Button
                            className="w-full"
                            htmlType="submit"
                            type="primary"
                            size="large"
                            onClick={() => dispatch({ type: 'add', validateFields: () => form.validateFields() })}>
                            Add
                        </Button>
                    </Form.Item>
                </Col>
                <Col offset={1}></Col>
            </Row>
        </Form>
    )
}