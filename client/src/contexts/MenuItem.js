import React from "react";
// Utils
import { getIdUnique } from "../utils";
// Antd Icon
import {
    BankOutlined,
    ImportOutlined,
    ExclamationOutlined,
    CheckOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
// Contexts
import { HouseChargePage } from "../pages";

const MenuItemContext = React.createContext([
    {
        key: getIdUnique(),
        title: 'House Charge',
        isExpanded: true,
        icon: BankOutlined,
        items: [
            {
                subKey: getIdUnique(),
                subIcon: ImportOutlined,
                subTitle: 'Nhập dữ liệu',
                description: 'Nhập dữ liệu đầu vào để lưu vào kho dữ liệu tổng hợp',
                component: HouseChargePage.ImportData,
            },
            {
                subKey: getIdUnique(),
                subIcon: ExclamationOutlined,
                subTitle: 'Hóa đơn nợ chưa thu',
                description: 'Tổng hợp các hóa đơn nợ chưa thu tiền theo tên người giao hàng',
                component: null,
            },
            {
                subKey: getIdUnique(),
                subIcon: CheckOutlined,
                subTitle: 'Hóa đơn nợ đã thu',
                description: 'Tổng hợp các hóa đơn nợ dẵ thu tiền theo tên người giao hàng',
                component: null,
            },
            {
                subKey: getIdUnique(),
                subIcon: UnorderedListOutlined,
                subTitle: 'Tổng hợp các hóa đơn',
                description: 'Tổng hợp tất cả các hóa đơn nợ đã thu và chưa thu tiền',
                component: HouseChargePage.DebtBill,
            },
        ]
    }
]);
export default MenuItemContext;