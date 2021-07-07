import React, { useContext } from "react";
import PropTypes from "prop-types";
// Context
import { TableDebtBillContext } from "../contexts";

export default function TableDebtBillProvider({ children }) {
    return (
        <TableDebtBillContext.Provider value={useContext(TableDebtBillContext)}>
            {children}
        </TableDebtBillContext.Provider>
    )
}
TableDebtBillProvider.propTypes = {
    children: PropTypes.any,
}