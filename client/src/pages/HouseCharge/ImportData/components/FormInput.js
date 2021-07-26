import React, { useCallback, useState } from "react";
// AntD
import { Divider, Row, Col, Form, Input, Button, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// Excel
import * as XLSX from "xlsx";

export default function FormInput() {
    const [form] = Form.useForm();

    const handleOnActionImportFile = useCallback(
        (file) => {
            console.log(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                /* Update state */
                console.log(data);
            }
            reader.readAsBinaryString(file);
            return false;
        },
        [],
    )

    const handleOnClickAdd = useCallback(
        () => {
            form.validateFields()
                .then(values => {
                    console.log(values);
                })
                .catch(errorInfo => {
                    console.log(errorInfo);
                });
        },
        [],
    )

    const handleOnClickRefesh = useCallback(
        () => {
            form.resetFields();
        },
        [],
    )

    const validatorRequired = useCallback(
        (name, value) => {
            if (!value) {
                return Promise.reject(new Error(`Vui lòng nhập ${name}`));
            }
            return Promise.resolve();
        },
        [],
    )

    const validatorNumber = useCallback(
        (name, value, min, max) => {
            if (!value) {
                return Promise.reject(new Error(`Vui lòng nhập ${name}`));
            } else {
                value = Number(value);
                if (!Number.isNaN(value)) {
                    if (Number.isInteger(value)) {
                        if (min) {
                            if (value < min) {
                                return Promise.reject(new Error(`${name} phải >= ${min}`));
                            }
                            if (value > max) {
                                return Promise.reject(new Error(`${name} phải <= ${max}`));
                            }
                        }
                        return Promise.resolve();
                    }
                }
                return Promise.reject(new Error(`${name} phải là kí tự số`));
            }
        },
        [],
    )

    return (
        <>
            <Row className="import-data__form-input-heading">
                <Col span={24}>
                    <Divider orientation="left" plain>
                        <span className="input-heading__title">
                            Nhập dữ liệu
                        </span>
                    </Divider>
                </Col>
            </Row>
            <Form
                className="import-data__form-input-content"
                form={form}
                size="large"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 9 }}>
                <Form.Item
                    className="input-form__item"
                    name="inpDate"
                    label="Date"
                    hasFeedback
                    rules={[
                        () => ({
                            validator(_, value) {
                                return validatorRequired('Ngày', value);
                            },
                        }),
                    ]}
                    required>
                    <DatePicker className="input-form__item-input" />
                </Form.Item>
                <Form.Item
                    className="input-form__item"
                    name="inpBill"
                    label="Bill"
                    hasFeedback
                    rules={[
                        () => ({
                            validator(_, value) {
                                return validatorNumber('Mã hóa đơn', value, 1, 99999);
                            },
                        }),
                    ]}
                    required>
                    <Input className="input-form__item-input" />
                </Form.Item>
                <Form.Item
                    className="input-form__item"
                    name="inpCash"
                    label="Cash"
                    hasFeedback
                    rules={[
                        () => ({
                            validator(_, value) {
                                return validatorNumber('Số quầy', value, 1, 99);
                            },
                        }),
                    ]}
                    required>
                    <Input className="input-form__item-input" />
                </Form.Item>
                <Form.Item
                    className="input-form__item"
                    name="inpPrice"
                    label="Price"
                    hasFeedback
                    rules={[
                        () => ({
                            validator(_, value) {
                                return validatorNumber('Số tiền', value, 1, 9999999999);
                            },
                        }),
                    ]}
                    required>
                    <Input className="input-form__item-input" />
                </Form.Item>
                <Form.Item
                    className="input-form__item"
                    name="inpNote"
                    label="Address"
                    wrapperCol={{ span: 18 }}
                    hasFeedback
                    rules={[
                        () => ({
                            validator(_, value) {
                                return validatorRequired('Địa chỉ', value);
                            },
                        }),
                    ]}
                    required>
                    <Input.TextArea
                        className="input-form__item-input"
                        rows={4}
                        placeholder="Nhập địa chỉ thanh toán"
                    />
                </Form.Item>
                <Form.Item
                    className="input-form__item"
                    name="inpNote"
                    label="Notes"
                    wrapperCol={{ span: 18 }}>
                    <Input.TextArea
                        className="input-form__item-input"
                        rows={2}
                        placeholder="Nhập thêm ghi chú (Nếu cần)"
                    />
                </Form.Item>
                <Form.Item
                    className="input-form__item"
                    hasFeedback
                    wrapperCol={{ span: 24 }}>
                    <Row
                        justify="end"
                        align="middle">
                        <Col span={5}>
                            <Button
                                className="input-form__item-btn w-full"
                                htmlType="reset"
                                size="large"
                                onClick={handleOnClickRefesh}>
                                Refresh
                            </Button>
                        </Col>
                        <Col span={5} offset={1}>
                            <Upload
                                accept=".xlsx"
                                maxCount={1}
                                showUploadList={false}
                                beforeUpload={handleOnActionImportFile}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </Upload>
                        </Col>
                        <Col span={5} offset={1}>
                            <Button
                                className="input-form__item-btn w-full"
                                htmlType="submit"
                                type="primary"
                                size="large"
                                onClick={handleOnClickAdd}>
                                Add
                            </Button>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </Form.Item>
            </Form>
        </>
    );
}