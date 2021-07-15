import React, { useContext } from "react";
// AntD
import { Row, Col, Divider, Table, Button } from "antd";
// Context
import { TableDebtBillContext } from "../../../contexts";

export default function DebtBillPayment() {
    const tableDebtBillContext = useContext(TableDebtBillContext);
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
                                Danh sách thu chi hóa đơn nợ
                            </Divider>
                        </Col>
                    </Row>
                    <Row
                        className="debt-bill__total-content">
                        <Col span={24}>
                            <Table
                                className="debt-bill__total-content-data"
                                columns={tableDebtBillContext.columnsDebtBillPayment}
                                dataSource={tableDebtBillContext.dataFake}
                                bordered={true}
                                size="small"
                                scroll={{ x: 1200, y: 440 }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}