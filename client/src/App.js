import React from "react";
// AntD
import { Layout } from "antd";
// Providers
import { MenuItemProvider, TableDebtBillProvider } from "./providers";
// Components
import { Wapper, Sider } from "./components";

function App() {
    return (
        <Layout className="App">
            <MenuItemProvider>
                <Sider />
                <TableDebtBillProvider>
                    <Wapper />
                </TableDebtBillProvider>
            </MenuItemProvider>
        </Layout>
    );
}

export default App;
