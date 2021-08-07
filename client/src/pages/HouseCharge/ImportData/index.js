import React, { useCallback, useContext, useEffect, useState } from "react";

// AntD
import {
    Tabs, notification,
    Row, Col,
    Form, Input, Button, DatePicker, Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
// Excel
import * as XLSX from "xlsx";
// Services
import { HouseChargeServices } from "../../../services";
// Hooks
import { StatusContext } from "../../../contexts";
// Utils
import { Validator } from "../../../utils";
// TabBill
import TabBill from "./TabBill";

export default function ImportData() {
    // Contexts
    const { setStatusLoading } = useContext(StatusContext.Loading);
    // Hooks
    const [formTabBill] = Form.useForm();
    const [formTabYear] = Form.useForm();
    const [formTabShipper] = Form.useForm();
    const [keyCols] = useState([
        'date',
        'till',
        'bill',
        'cash',
        'price',
        'address',
        'note'
    ]);
    const [message, setMessage] = useState(null);
    useEffect(() => {
        return message && message();
    }, [message])
    // Handle
    // === Tab Bill ===
    const handleTableBillOnActionUploadFile = (file) => {
        setStatusLoading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            let data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            /* Update state */

            const limitUpload = 100;

            const dataSplitLimit = () => {
                return data.slice(0).reduce((arrNew, vCurr, index) => {
                    if (index < limitUpload && vCurr) {
                        let vNew = vCurr.reduce((objNewChild, vCurrChild, indexChild) => {
                            const key = keyCols[indexChild];
                            let value = vCurrChild.toString().trim();
                            if (key === 'date' ||
                                key === 'till' ||
                                key === 'bill' ||
                                key === 'cash' ||
                                key === 'price') {
                                value = Number(value);
                            }
                            objNewChild[`${key}`] = value;
                            return objNewChild;
                        }, {});
                        vNew = {
                            ...vNew,
                            // Formula Time Excel: (serial - 25569) * 86400;
                            key: `${(vNew.date - 25569) * 86400}-${vNew.till}-${vNew.bill}-${vNew.cash}`,
                        }
                        data.splice(0, 1);
                        return [...arrNew, vNew];
                    }
                    return arrNew;
                }, []);
            };

            while (data.length >= limitUpload) {
                let dataToBeProcessed = dataSplitLimit();
                try {
                    const result = await HouseChargeServices.Bill.uploadFile(dataToBeProcessed);
                    if (result.data.isSuccess) {
                        // countUploaded += result.data.count;
                        // console.log('Uploaded:', countUploaded);
                        if (data.length === 0) {
                            // Success
                            setMessage(notification.success({
                                message: 'Thêm dữ liệu',
                                description: result.data.message,
                                duration: 1.5,
                            }));
                        }
                        if (data.length < limitUpload) {
                            dataToBeProcessed = dataSplitLimit();
                            const resultEnd = await HouseChargeServices.Bill.uploadFile(dataToBeProcessed);
                            if (resultEnd.data.isSuccess) {
                                // countUploaded += result.data.count;
                                // console.log('Uploaded:', countUploaded);
                                // Success
                                setMessage(notification.success({
                                    message: 'Thêm dữ liệu',
                                    description: result.data.message,
                                    duration: 1.5,
                                }));
                            } else {
                                // Error
                                setMessage(notification.error({
                                    message: 'Thêm dữ liệu',
                                    description: result.data.error,
                                    duration: 2,
                                }));
                            }
                        }
                    } else {
                        // Error
                        setMessage(notification.error({
                            message: 'Thêm dữ liệu',
                            description: result.data.error,
                            duration: 2,
                        }));
                    }
                } catch (error) {
                    // Error
                    setMessage(notification.error({
                        message: 'Thêm dữ liệu',
                        description: error,
                        duration: 2,
                    }));
                }
            }

            setStatusLoading(false);

        }
        reader.readAsBinaryString(file);
        return false;
    }
    // const handleTabBillOnClickBtnAdd = () => {
    //     setStatusLoading(true);

    //     formTabBill.validateFields()
    //         .then(values => {
    //             const result = {
    //                 ...values,
    //                 date: values.date.unix(),
    //                 key: `${values.date.unix()}-${values.bill}-${values.till}-${values.cash}`,
    //             }
    //             HouseChargeServices.Bill.add(result)
    //                 .then(res => {
    //                     const result = res.data;
    //                     if (result.isError) {
    //                         // Error
    //                         setMessage(notification.error({
    //                             message: 'Thêm dữ liệu',
    //                             description: result.error,
    //                         }));
    //                     } else {
    //                         if (result.isExist) {
    //                             // Exist
    //                             setMessage(notification.warn({
    //                                 message: 'Thêm dữ liệu',
    //                                 description: result.message,
    //                                 duration: 1.5,
    //                             }));
    //                         } else {
    //                             // Success
    //                             setMessage(notification.success({
    //                                 message: 'Thêm dữ liệu',
    //                                 description: result.message,
    //                                 duration: 1.5,
    //                             }));
    //                             formTabBill.resetFields();
    //                         }
    //                     }
    //                 })
    //                 .catch(err => {
    //                     // Error
    //                     setMessage(notification.error({
    //                         message: 'Thêm dữ liệu',
    //                         description: err,
    //                         duration: 2,
    //                     }));
    //                 })
    //                 .finally(setStatusLoading(false));
    //         })
    //         .catch(errorInfo => {
    //             // Missing Info Field
    //             // console.log(errorInfo);
    //             setMessage(notification.warn({
    //                 message: 'Thêm dữ liệu',
    //                 description: 'Vui lòng điền đầy đủ thông tin',
    //                 duration: 1.5,
    //             }));
    //             setStatusLoading(false);
    //         })
    // }
    const handleTableBillOnClickBtnRefesh = () => {
        formTabBill.resetFields();
    }
    // === Tab Year ===
    const handleTabYearOnClickBtnAdd = () => {
        setStatusLoading(true);
        formTabYear.validateFields()
            .then(value => {
                HouseChargeServices.Year.add(value)
                    .then(res => {

                    })
                    .catch(err => {
                        // Error
                        setMessage(notification.error({
                            message: 'Thêm dữ liệu',
                            description: err,
                            duration: 2,
                        }));
                    })
                    .finally(setStatusLoading(false));
            })
            .catch(err => {
                // Missing Info Field
                // console.log(errorInfo);
                setMessage(notification.warn({
                    message: 'Thêm dữ liệu',
                    description: 'Vui lòng điền đầy đủ thông tin',
                    duration: 1.5,
                }));
            })
    }

    return (
        <>
            <Row
                className="content__house-charge"
                align="top">
                <Col span={24}>
                    <Tabs
                        className="import-data__tabs"
                        type="line">
                        <Tabs.TabPane tab="BILL" key="bill">
                            <TabBill />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="YEAR" key="year">
                            <Form
                                className="tab-year__form-input"
                                form={formTabYear}
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
                                                onClick={handleTabYearOnClickBtnAdd}>
                                                Add
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="SHIPPER" key="shipper">
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
            </Row>
        </>
    );
}