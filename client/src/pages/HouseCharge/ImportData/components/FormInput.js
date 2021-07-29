import React, { useCallback, useContext, useEffect, useState } from "react";
// AntD
import {
    Divider,
    Row, Col, Form, Input, Button, DatePicker, Upload,
    notification,
    Spin,
    Progress,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
// Excel
import * as XLSX from "xlsx";
// Contexts
import { TableContext } from "../../../../contexts";
// Services
import { HouseChargeServices } from "../../../../services";

export default function FormInput() {
    const [form] = Form.useForm();
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [percentUploadCurr, setPercentUploadCurr] = useState(0);

    const tableHeader = useContext(TableContext.TableHeader);
    const [keyCols] = useState(_ => {
        const keyColsDefault = [];
        if (tableHeader.Columns) {
            Object.keys(tableHeader.Columns).forEach(keyCol => {
                if (keyCol === 'shipper' || keyCol === 'action' || keyCol === 'status') return;
                keyColsDefault.push(keyCol);
            });
        }
        return keyColsDefault;
    });

    const [message, setMessage] = useState(null);
    useEffect(() => {
        return message && message();
    }, [message])

    const handleOnActionUploadFile = useCallback(
        (file) => {
            // console.log(file);
            const reader = new FileReader();
            reader.onload = async (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                let data = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false });
                /* Update state */
                // console.log(data);

                setPercentUploadCurr(0);
                setLoadingUpload(true);

                // Add Key into Array Result
                const limitUpload = 10;
                let countUploaded = 0;

                const dataSplitLimit = () => {
                    return data.slice(0).reduce((arrNew, vCurr, index) => {
                        if (index < limitUpload && vCurr) {
                            let vNew = vCurr.reduce((objNewChild, vCurrChild, indexChild) => {
                                const key = keyCols[indexChild];
                                objNewChild[`${key}`] = vCurrChild;
                                return objNewChild;
                            }, {});
                            vNew = {
                                ...vNew,
                                // Formula Time Excel: (serial - 25569) * 86400;
                                key: `${(vNew.date - 25569) * 86400}-${vNew.bill}-${vNew.till}-${vNew.cash}`,
                            }
                            data.splice(1, 1);
                            return [...arrNew, vNew];
                        }
                        return arrNew;
                    }, []);
                };

                while (data.length >= limitUpload) {
                    let dataToBeProcessed = dataSplitLimit();
                    try {
                        const result = await HouseChargeServices.uploadFile(dataToBeProcessed);
                        countUploaded += result.data.count;
                        console.log('Uploaded:', countUploaded);
                        const percentUpload = Math.round(100 / data.length) * limitUpload;
                        setPercentUploadCurr(percentUploadCurr + percentUpload);
                        if (data.length < limitUpload) {
                            dataToBeProcessed = dataSplitLimit();
                            const result = await HouseChargeServices.uploadFile(dataToBeProcessed);
                            countUploaded += result.data.count;
                            console.log('Uploaded:', countUploaded);
                            setPercentUploadCurr(percentUploadCurr + percentUpload);
                            if (countUploaded === 0) {
                                setMessage(notification.error({
                                    message: 'Thêm dữ liệu',
                                    description: `Upload thất bại`,
                                    duration: 2,
                                }));
                            } else {
                                setMessage(notification.success({
                                    message: 'Thêm dữ liệu',
                                    description: `Upload thành công ${countUploaded} Bill`,
                                    duration: 2,
                                }));
                            }
                            setLoadingUpload(false);
                        }
                    } catch (error) {
                        setMessage(notification.error({
                            message: 'Thêm dữ liệu',
                            description: error,
                            duration: 2,
                        }));
                    }
                }
            }
            reader.readAsBinaryString(file);
            return false;
        },
        [],
    )

    const handleOnClickAdd = useCallback(
        () => {
            setLoadingAdd(true);
            form.validateFields()
                .then(values => {
                    const result = {
                        ...values,
                        date: values.date.unix(),
                        key: `${values.date}-${values.bill}-${values.till}-${values.cash}`,
                    }
                    HouseChargeServices.add(result)
                        .then(res => {
                            const result = res.data;
                            if (result.isError) {
                                // Error
                                setMessage(notification.error({
                                    message: 'Thêm dữ liệu',
                                    description: result.message,
                                }));
                                if (result.logError) {
                                    setMessage(notification.error({
                                        message: 'Thêm dữ liệu',
                                        description: result.logError,
                                    }));
                                }
                            } else {
                                if (result.isExist) {
                                    // Exist
                                    setMessage(notification.warn({
                                        message: 'Thêm dữ liệu',
                                        description: result.message,
                                        duration: 1.5,
                                    }));
                                } else {
                                    // Success
                                    setMessage(notification.success({
                                        message: 'Thêm dữ liệu',
                                        description: result.message,
                                        duration: 1.5,
                                    }));
                                    form.resetFields();
                                }
                            }
                        })
                        .catch(err => {
                            // Error
                            setMessage(notification.error({
                                message: 'Thêm dữ liệu',
                                description: err,
                                duration: 2,
                            }));
                            if (result.logError) {
                                setMessage(notification.error({
                                    message: 'Thêm dữ liệu',
                                    description: result.logError,
                                }));
                            }
                        })
                        .finally(setLoadingAdd(false));
                })
                .catch(errorInfo => {
                    // Missing Info Field
                    // console.log(errorInfo);
                });
        },
        [],
    )

    const handleOnClickRefesh = useCallback(
        () => {
            form.resetFields();
            setPercentUploadCurr(0);
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
                <Spin
                    size="large"
                    spinning={loadingUpload}>
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
                                name="till"
                                label="Till"
                                hasFeedback
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            return validatorNumber('Mã thu ngân', value, 1, 99999);
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
                            span={5}
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
                                    beforeUpload={handleOnActionUploadFile}>
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
                                    loading={loadingAdd}
                                    onClick={handleOnClickAdd}>
                                    Add
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col offset={1}></Col>
                    </Row>
                </Spin>
            </Form>
            <Row justify="center">
                <Col span={23}>
                    <Progress strokeLinecap="square" percent={percentUploadCurr} />
                </Col>
            </Row>
        </>
    );
}