import React, { useEffect, useContext, useState } from "react";
// AntD
import { Layout, Spin } from "antd";
// Providers
import { MenuItemProvider, TableDebtBillProvider, StatusLoadingProvider } from "./providers";
// Components
import { Wapper, Sider } from "./components";

function App() {
    return (
        <StatusLoadingProvider>
            <Layout className="App">
                <MenuItemProvider>
                    <Sider />
                    <TableDebtBillProvider>
                        <Wapper />
                    </TableDebtBillProvider>
                </MenuItemProvider>
            </Layout>
        </StatusLoadingProvider>
    );
}

export default App;
