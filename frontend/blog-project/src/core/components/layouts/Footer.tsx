import { Layout, Button, Divider } from "antd";
import {
  HeartFilled,
  FacebookFilled,
  TwitterSquareFilled,
  GithubFilled,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Footer } = Layout;
const PINK = "#ff4d8d";
const AppFooter = () => {
  return (
    <Footer
      style={{
        background: "linear-gradient(135deg, #fff0f6, #ffffff)",
        borderTop: "1px solid #ffd6e7",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 32,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: PINK,
                  color: "#fff",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                }}
              >
                CM
              </div>
              <span style={{ fontSize: 18, fontWeight: 700 }}>
                Content Manager
              </span>
            </div>
            <p style={{ marginTop: 12, color: "#666", fontSize: 14 }}>
              Nền tảng quản lý nội dung hiện đại, giúp bạn đăng bài, chia sẻ
              ý tưởng và kết nối cộng đồng.
            </p>
          </div>
          <div>
            <h4>Liên kết</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link to="/">Trang chủ</Link>
              <Link to="/create">Đăng bài</Link>
              <Link to="/about">Giới thiệu</Link>
              <Link to="/contact">Liên hệ</Link>
            </div>
          </div>
          <div>
            <h4>Tài nguyên</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link to="/docs">Tài liệu</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/privacy">Chính sách</Link>
            </div>
          </div>
          <div>
            <h4>Kết nối</h4>
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                shape="circle"
                icon={<FacebookFilled />}
                href="https://facebook.com"
                target="_blank"
              />
              <Button
                shape="circle"
                icon={<TwitterSquareFilled />}
                href="https://twitter.com"
                target="_blank"
              />
              <Button
                shape="circle"
                icon={<GithubFilled />}
                href="https://github.com"
                target="_blank"
              />
              <Button
                shape="circle"
                icon={<MailOutlined />}
                href="mailto:example@gmail.com"
              />
            </div>
            <div
              style={{
                marginTop: 16,
                padding: 12,
                borderRadius: 8,
                background: "#fff0f6",
                border: "1px solid #ffd6e7",
                fontSize: 12,
              }}
            >
              💌 Đăng ký nhận tin để cập nhật tính năng mới
            </div>
          </div>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 13,
            color: "#666",
          }}
        >
          <span>
            © {new Date().getFullYear()} Content Manager — Made with{" "}
            <HeartFilled style={{ color: PINK }} />
          </span>

          <div style={{ display: "flex", gap: 16 }}>
            <Link to="/terms">Điều khoản</Link>
            <Link to="/privacy">Bảo mật</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </Footer>
  );
};
export default AppFooter;
