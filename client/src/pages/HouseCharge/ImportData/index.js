import React from "react";
// AntD
import {
    Tabs,
    Row, Col,
    Form, Button, DatePicker,
} from "antd";

// Utils
import { Validator } from "../../../utils";
// TabBill
import TabBill from "./TabBill";
import TabYear from "./TabYear";

export default function ImportData() {
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
                            <TabYear />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="SHIPPER" key="shipper">
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
            </Row>
        </>
    );
}