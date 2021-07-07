import React from "react";
// AntD
import { Row, Col } from "antd";
// Components
import { ImportDataByFile, ImportDataByInput } from "./components";

export default function ImportData() {
    return (
        <>
            <Row
                className="content__house-charge"
                justify="space-around"
                align="top">
                <Col className="import-data__input" span={11}>
                    <ImportDataByInput />
                </Col>
                <Col className="import-data__file" span={11}>
                    <ImportDataByFile />
                </Col>
            </Row>
        </>
    );
}