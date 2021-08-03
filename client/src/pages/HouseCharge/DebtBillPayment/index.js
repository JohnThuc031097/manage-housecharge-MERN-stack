import React, { useContext, useState, useEffect } from "react";
// AntD
import {
    Row, Col, Table,
    Button,
    Form, Select, Input
} from "antd";
// Context
import { TableDebtBillContext, TableContext } from "../../../contexts";

export default function DebtBillPayment() {
    // Context
    const tableDebtBillContext = useContext(TableDebtBillContext);
    const { Columns } = useContext(TableContext.TableHeader)
    // Hooks
    const [form] = Form.useForm();
    const [statusLoadingBtnLoad, setStatusLoadingBtnLoad] = useState(false);
    const [dataYear, setDataYear] = useState([2020, 2021]);
    // Variable handling
    const [columnHeader, setColumnHeader] = useState(null);
    useEffect(() => {
        const columnNew = Object.keys(Columns).reduce((arrs, keyCrr) => {
            return [...arrs, Columns[keyCrr]];
        }, []);
        setColumnHeader(columnNew);
    }, [])

    const handleOnClickLoad = () => {

    }

    return (
        <>
            <Row
                className="content__house-charge"
                justify="center"
                align="top">
                <Col
                    className="debt-bill-payment"
                    span={24}>
                    <Row
                        className="debt-bill-payment__heading"
                        align="top">
                        <Col span={24}>
                            <Form
                                className="debt-bill-payment__heading-form"
                                form={form}>
                                <Row
                                    align="middle">
                                    <Col
                                        span={6}>
                                        <Form.Item
                                            label="Dữ liệu năm:"
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 14 }}>
                                            <Select
                                                className="w-full"
                                                placeholder="Vui lòng chọn năm">
                                                {dataYear.map((year, index) => (<Select.Option key={index} value={year}>{year}</Select.Option>))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        span={2}>
                                        <Form.Item
                                            wrapperCol={{ span: 24 }}>
                                            <Button
                                                className="w-full"
                                                type="primary"
                                                size="middle"
                                                loading={statusLoadingBtnLoad}
                                                onClick={handleOnClickLoad}>
                                                Load
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        span={4}
                                        offset={2}>
                                        <Form.Item
                                            label="Tổng bill:"
                                            wrapperCol={{ span: 24 }}>
                                            <Input
                                                type="text"
                                                bordered={false}
                                                align="center"
                                                value="">
                                            </Input>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        span={4}
                                        offset={1}>
                                        <Form.Item
                                            label="Đã thu:"
                                            wrapperCol={{ span: 24 }}>
                                            <Input
                                                type="text"
                                                bordered={false}
                                                align="center"
                                                value="12315132">
                                            </Input>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        span={4}
                                        offset={1}>
                                        <Form.Item
                                            label="Chưa thu:"
                                            wrapperCol={{ span: 24 }}>
                                            <Input
                                                type="text"
                                                bordered={false}
                                                align="center"
                                                value="">
                                            </Input>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <Row
                        align="top">
                        <Col span={24}>
                            <Table
                                className="debt-bill-payment__table"
                                columns={columnHeader}
                                bordered={true}
                                size="small"
                                scroll={{ x: 1200, y: 450 }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}