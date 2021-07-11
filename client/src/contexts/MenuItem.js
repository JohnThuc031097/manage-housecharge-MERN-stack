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
                subTitle: 'Thu chi hóa đơn nợ',
                description: 'Thu chi các hóa đơn nợ giao hàng',
                component: HouseChargePage.DebtBillPayment,
            },
            {
                subKey: getIdUnique(),
                subIcon: UnorderedListOutlined,
                subTitle: 'Tổng hợp hóa đơn nợ',
                description: 'Tổng hợp tất cả các hóa đơn nợ đã thu và chưa thu tiền',
                component: HouseChargePage.DebtBill,
            },
        ]
    }
]);
export default MenuItemContext;