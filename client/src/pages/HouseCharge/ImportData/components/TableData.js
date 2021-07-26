import React, { useCallback, useContext, useEffect, useState } from "react";
// Antd
import { Row, Col, Divider, Table } from "antd";
import { InboxOutlined } from "@ant-design/icons";
// Services
import { HouseChargeServices } from "../../../../services";
// Contexts
import { TableContext } from "../../../../contexts";

export default function TableData() {
    const tableHeader = useContext(TableContext.TableHeader)
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        if (tableHeader.Columns) {
            const cols = [];
            Object.keys(tableHeader.Columns).forEach(col => {
                if (col === 'shipper' || col === 'action' || col === 'status') return;
                cols.push(tableHeader.Columns[col]);
            });
            return setColumns(cols);
        }
    }, []);

    return (
        <>
            <Row className="import-data__table-data-heading">
                <Col span={24}>
                    <Divider orientation="left" plain>
                        <span className="file-heading__title">
                            Bảng dữ liệu nhập
                        </span>
                    </Divider>
                </Col>
            </Row>
            <Row >
                <Col span={24}>
                    <Row
                        className="import-data__table-data-content"
                        justify="center">
                        <Col span={23}>
                            <Table
                                className="table-data-content__show"
                                columns={columns}
                                scroll={{ y: '50vh' }}
                                size="small"
                                bordered />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}