import React, { useEffect, useContext } from "react";
// AntD
import { Layout, Spin } from "antd";
// Providers
import { MenuItemProvider, TableDebtBillProvider, LoadingProvider } from "./providers";
// Components
import { Wapper, Sider } from "./components";
// Hooks
import { LoadingContext } from "./contexts";
function App() {
    const [loading, setLoading] = useContext(LoadingContext);
    return (
        <LoadingProvider>
            <Spin
                tip="Hệ thống đang xử lý dữ liệu. Vui lòng đợi trong giây lát ..."
                size="large"
                spinning={loading}>
                <Layout className="App">
                    <MenuItemProvider>
                        <Sider />
                        <TableDebtBillProvider>
                            <Wapper />
                        </TableDebtBillProvider>
                    </MenuItemProvider>
                </Layout>
            </Spin >
        </LoadingProvider >
    );
}

export default App;
