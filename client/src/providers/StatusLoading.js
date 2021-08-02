import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
// AntD
import { Spin } from "antd";
// Context
import { StatusContext } from "../contexts";

export default function StatusLoadingProvider({ children }) {
    const [statusLoading, setStatusLoading] = useState(false);

    return (
        <StatusContext.Loading.Provider value={{
            statusLoading,
            setStatusLoading
        }}>
            <Spin
                tip="Hệ thống đang xử lý dữ liệu. Vui lòng đợi trong giây lát ..."
                size="large"
                spinning={statusLoading}>
                {children}
            </Spin>
        </StatusContext.Loading.Provider>
    )
}

StatusLoadingProvider.propTypes = {
    children: PropTypes.any,
}