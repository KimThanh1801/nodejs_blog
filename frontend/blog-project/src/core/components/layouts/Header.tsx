import { useState } from "react"
import { Layout, Button, Grid, Avatar, Input, Dropdown, Modal } from "antd"
import { MenuOutlined, SearchOutlined } from "@ant-design/icons"
import LoginForm from "../users/LoginForm"
import RegisterForm from "../users/RegisterForm"
const { Header } = Layout
const { useBreakpoint } = Grid

const PINK = "#ff4d8d"

const AppHeader = () => {
  const screens = useBreakpoint()
  const [modalVisible, setModalVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")

  const menuItems = [
    {
      key: "login",
      label: "Đăng nhập",
      onClick: () => { setActiveTab("login"); setModalVisible(true) },
    },
    {
      key: "register",
      label: "Đăng ký",
      onClick: () => { setActiveTab("register"); setModalVisible(true) },
    },
  ]

  return (
    <>
      <Header style={{ background: "#fff", borderBottom: `1px solid #ffe0ec`, padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 180 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: PINK, color: "#fff", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace" }}>CM</div>
            <span style={{ fontSize: 18, fontWeight: 600, color: "#333" }}>Content Manager</span>
          </div>

          {screens.md && (
            <div style={{ flex: 1, maxWidth: 400 }}>
              <Input placeholder="Tìm kiếm bài viết..." prefix={<SearchOutlined style={{ color: PINK }} />} allowClear style={{ borderRadius: 20 }} />
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {screens.sm && (
              <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <Avatar
                  src="https://img.thuthuatphanmem.vn/uploads/2018/09/24/anh-nobita-doremon-cao-boi_054126468.jpg"
                  size={40}
                  style={{
                    cursor: "pointer",
                    border: "2px solid #fff",
                  }}
                />
              </Dropdown>

            )}
            {!screens.md && <Button icon={<MenuOutlined />} />}
          </div>
        </div>
      </Header>

      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
        width={400}
        style={{ borderRadius: 16 }}
      >
        {activeTab === "login" ? (
          <LoginForm
            onClose={() => setModalVisible(false)}
            onSwitchToRegister={() => setActiveTab("register")}
          />
        ) : (
          <RegisterForm
            onSubmitSuccess={() => setModalVisible(false)}
            onSwitchToLogin={() => setActiveTab("login")}
          />
        )}
      </Modal>
    </>
  )
}

export default AppHeader