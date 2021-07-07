import React, { useState, useCallback, useContext } from "react";
// Contexts
import { MenuItemContext } from "../../contexts";
// AntD
import { Row, Col, Menu, Button, Layout } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DoubleRightOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default function Sider() {
    const [collapsed, setCollapsed] = useState(false);
    const { menuList, itemsExpanded, menuItemSelected, updateMenuItemSelected } = useContext(MenuItemContext);

    const toggleCollapsed = useCallback(
        () => setCollapsed(!collapsed),
        [collapsed]);

    const getItemsExpanded = useCallback(
        () => itemsExpanded(),
        [menuList]);
    const handleSelectItemChild = useCallback(
        ({ item }) => updateMenuItemSelected(() => {
            return item.props.data;
        }),
        [menuItemSelected]);

    return (
        <Layout.Sider
            id="sider"
            width="250"
            collapsed={collapsed}
            onCollapse={toggleCollapsed}>
            <Row className="sider__heading" justify="center" align="middle">
                <Col className="sider__heading-btn" span={24}>
                    <Button onClick={toggleCollapsed}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                </Col>
            </Row>
            <Row className="sider__menu" align="middle">
                <Col span={24}>
                    <Menu
                        className="sider__menu-list"
                        defaultOpenKeys={getItemsExpanded}
                        // inlineCollapsed={collapsed}
                        mode="inline"
                        theme="light"
                        onSelect={handleSelectItemChild}>
                        {menuList.map((menuItem) => (
                            <SubMenu
                                className="sider__menu-sub"
                                key={menuItem.key}
                                title={menuItem.title}
                                icon={menuItem?.icon ? <menuItem.icon /> : <DoubleRightOutlined />}>
                                {menuItem.items.map((menuItemSub) => (
                                    <Menu.Item
                                        className="sider__menu-sub-item"
                                        key={menuItemSub.subKey}
                                        icon={menuItemSub?.subIcon ? <menuItemSub.subIcon /> : <DoubleRightOutlined />}
                                        data={{ title: menuItem.title, ...menuItemSub }}>
                                        {menuItemSub.subTitle}
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        ))}
                    </Menu>
                </Col>
            </Row>
        </Layout.Sider>
    )
}