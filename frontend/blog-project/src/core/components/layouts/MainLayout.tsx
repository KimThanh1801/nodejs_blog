import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "./Header";
import AppFooter from "./Footer";
const { Content } = Layout;
const HEADER_HEIGHT = 64;
const MainLayout = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                }}
            >
                <AppHeader />
            </div>
            <Content style={{ marginTop: HEADER_HEIGHT }}>
                <div>
                    <Outlet />
                </div>
            </Content>

            <AppFooter />
        </Layout>
    );
};

export default MainLayout;
