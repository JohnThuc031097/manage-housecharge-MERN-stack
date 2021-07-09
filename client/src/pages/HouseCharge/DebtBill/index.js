import React, { useContext } from "react";
// AntD
import { Row, Col, Divider, Table } from "antd";
// Prodiver
import { TableDebtBillProvider } from "../../../providers";
// Context
import { TableDebtBillContext } from "../../../contexts";

export default function DebtBill() {
    const tableDebtBillContext = useContext(TableDebtBillContext);

    return (
        <>
            <Row
                className="content__house-charge"
                justify="center"
                align="top">
                <Col
                    className="debt-bill__total"
                    span={23}>
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
                                columns={tableDebtBillContext.columns}
                                dataSource={tableDebtBillContext.dataFake}
                                bordered={true}
                                size="small"
                                scroll={{ x: 1200, y: 380 }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}