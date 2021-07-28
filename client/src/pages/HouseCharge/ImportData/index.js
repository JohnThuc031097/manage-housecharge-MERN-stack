import React from "react";
// AntD
import { Row, Col } from "antd";
// Components
import { FormInput, TableData } from "./components";

export default function ImportData() {
    return (
        <>
            <Row
                className="content__house-charge"
                justify="space-around"
                align="top">
                <Col className="import-data__form-input" span={24}>
                    <FormInput />
                </Col>
            </Row>
        </>
    );
}