import React, { useCallback, useContext, useEffect, useState } from "react";
// Excel
import * as XLSX from "xlsx";
// Antd
import { Row, Col, Divider, Table } from "antd";
import { InboxOutlined } from "@ant-design/icons";
// Services
import { HouseChargeServices } from "../../../../services";
// Contexts
import { TableContext } from "../../../../contexts";

export default function TableData() {
    const { TableCols } = useContext(TableContext)
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        if (TableCols) {
            const cols = [];
            Object.keys(TableCols).forEach(col => {
                cols.push(TableCols[col]);
            });
            return setColumns(cols);
        }
    }, []);

    const handleOnActionUpload = useCallback(
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
            // console.log(reader.result);
            // HouseChargeServices.upload(file);
        },
        [],
    )

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
                                scroll={{ y: 400 }}
                                bordered>

                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}