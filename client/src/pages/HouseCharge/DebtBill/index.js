import React, { useContext, useCallback, useState } from "react";
// AntD
import { Row, Col, Divider, Table } from "antd";
// Context
import { TableDebtBillContext } from "../../../contexts";

export default function DebtBill() {
    const tableDebtBillContext = useContext(TableDebtBillContext);

    const expandedRowRender = useCallback((record, index, indent, expanded) => {
        if (expanded) {
            // console.log(record);
            const dataNew = tableDebtBillContext.dataFake.filter(x => {
                // console.log(x.date, record.date);
                // console.log(x.shipper[0], record.shipper[0]);
                return x.date === record.date && x.shipper[0] === record.shipper[0];
            });
            console.log(dataNew);
            return (
                <Table
                    columns={tableDebtBillContext.columnsDebtBillExpanable}
                    dataSource={dataNew}
                    size="small"
                    bordered={true}
                />
            )
        }
    }, []);
    return (
        <>
            <Row
                className="content__house-charge"
                justify="center"
                align="top">
                <Col
                    className="debt-bill__total"
                    span={24}>
                    <Row
                        className="debt-bill__total-heading">
                        <Col span={24}>
                            <Divider
                                className="debt-bill__total-heading-title"
                                orientation="left">
                                Danh sách tổng hợp các hóa đơn nợ
                            </Divider>
                        </Col>
                    </Row>
                    <Row
                        className="debt-bill__total-content">
                        <Col span={24}>
                            <Table
                                className="debt-bill__total-content-data"
                                columns={tableDebtBillContext.columnsDebtBill}
                                expandable={{ expandedRowRender }}
                                dataSource={tableDebtBillContext.dataFake}
                                bordered={true}
                                size="small"
                                scroll={{ y: 440 }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}