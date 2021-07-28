import React, { useCallback, useContext, useEffect, useState } from "react";
// AntD
import { Divider, Row, Col, Form, Input, Button, DatePicker, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// Excel
import * as XLSX from "xlsx";
// Contexts
import { TableContext } from "../../../../contexts";
// Services
import { HouseChargeServices } from "../../../../services";

export default function FormInput() {
    const [form] = Form.useForm();
    const tableHeader = useContext(TableContext.TableHeader);
    const [keyCols, setKeyCols] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (tableHeader.Columns) {
            const keyCols = [];
            Object.keys(tableHeader.Columns).forEach(keyCol => {
                if (keyCol === 'shipper' || keyCol === 'action' || keyCol === 'status') return;
                keyCols.push(keyCol);
            });
            return setKeyCols(keyCols);
        }
        if (message) {
            message();
        }
    }, [message]);

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
                // Calc Time Excel: (serial - 25569) * 86400;
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
                    const result = { ...values, date: values.date.unix() };
                    // console.log(result);
                    HouseChargeServices.add(result)
                        .then(res => {
                            setMessage(notification.success({
                                message: 'Thêm dữ liệu',
                                description: res.data,
                                duration: 2,
                            }));
                        })
                        .catch(err => {
                            setMessage(notification.error({
                                message: 'Thêm dữ liệu',
                                description: err,
                                duration: 2,
                            }));
                        });
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
                            Thông tin dữ liệu
                        </span>
                    </Divider>
                </Col>
            </Row>
            <Form
                className="import-data__form-input-content"
                form={form}
                size="large">
                <Row
                    className="mr-top-20"
                    align="top">
                    <Col
                        span={4}
                        offset={1}>
                        <Form.Item
                            className="input-form__item"
                            name="date"
                            label="Date"
                            labelAlign={{ span: 2 }}
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        return validatorRequired('Ngày', value);
                                    },
                                }),
                            ]}
                            required>
                            <DatePicker className="input-form__item-input mr-left-20" />
                        </Form.Item>
                    </Col>
                    <Col
                        span={3}
                        offset={1}>
                        <Form.Item
                            className="input-form__item"
                            name="bill"
                            label="Bill"
                            hasFeedback
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        return validatorNumber('Số hóa đơn', value, 1, 99999);
                                    },
                                }),
                            ]}
                            required>
                            <Input className="input-form__item-input" />
                        </Form.Item>
                    </Col>
                    <Col
                        span={3}
                        offset={1}>
                        <Form.Item
                            className="input-form__item"
                            name="cash"
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
                    </Col>
                    <Col
                        span={9}
                        offset={1}>
                        <Form.Item
                            className="input-form__item"
                            name="price"
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
                    </Col>
                </Row>
                <Row
                    className="mr-top-20"
                    align="top">
                    <Col
                        span={13}
                        offset={1}>
                        <Form.Item
                            className="input-form__item"
                            name="address"
                            label="Address"
                            wrapperCol={{ span: 20 }}
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
                    </Col>
                    <Col
                        span={9}>
                        <Form.Item
                            className="input-form__item"
                            name="note"
                            label="Notes"
                            wrapperCol={{ span: 26 }}>
                            <Input.TextArea
                                className="input-form__item-input"
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
                            className="input-form__item">
                            <Button
                                className="input-form__item-btn w-full"
                                htmlType="reset"
                                size="large"
                                onClick={handleOnClickRefesh}>
                                Refresh
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col
                        span={2}
                        offset={1}>
                        <Form.Item
                            className="input-form__item">
                            <Upload
                                accept=".xlsx"
                                maxCount={1}
                                showUploadList={false}
                                beforeUpload={handleOnActionImportFile}>
                                <Button icon={<UploadOutlined />}>Upload File</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col
                        span={2}
                        offset={1}>
                        <Form.Item
                            className="input-form__item">
                            <Button
                                className="input-form__item-btn w-full"
                                htmlType="submit"
                                type="primary"
                                size="large"
                                onClick={handleOnClickAdd}>
                                Add
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col offset={1}></Col>
                </Row>
            </Form>
        </>
    );
}