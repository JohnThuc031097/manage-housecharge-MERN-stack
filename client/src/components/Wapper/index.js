import React, { useContext } from "react";
// AntD
import { Row, Col, Layout, PageHeader, Empty } from "antd";
import { MenuItemContext } from "../../contexts";

export default function Wapper() {
    const { menuItemSelected } = useContext(MenuItemContext);
    return (
        <Layout id="wapper">
            <Layout.Header id="header">
                <PageHeader
                    className="header__title"
                    title={menuItemSelected?.title}
                    subTitle={menuItemSelected?.subTitle}
                />
            </Layout.Header>
            <Layout.Content id="content">
                {menuItemSelected?.component ?
                    <menuItemSelected.component /> :
                    <Empty
                        className="content__empty"
                        description="Không có dữ liệu"
                    />}
            </Layout.Content>
            <Layout.Footer id="footer">
                <Row id="footer" justify="center" align="middle">
                    <Col span={24}>Copyright @ 2021 Created by ThucNobita</Col>
                </Row>
            </Layout.Footer>
        </Layout>
    );
}