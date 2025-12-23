import { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Divider, message, Row, Col } from "antd";
import { MailOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import { loginUser, type LoginFormValues } from "../../../api/userAPI";
const { Title, Text } = Typography;
interface LoginFormProps {
    onClose: () => void;
    onSwitchToRegister?: () => void;
}
export default function LoginForm({ onClose, onSwitchToRegister }: LoginFormProps) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm<LoginFormValues>();

    const onFinish = async (values: LoginFormValues & { remember?: boolean }) => {
        setLoading(true);
        try {
            // Gọi API login
            const data = await loginUser({
                email: values.email,
                password: values.password,
            });

            console.log("Đăng nhập thành công:", data);

            // Lưu token vào localStorage (hoặc sessionStorage)
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            message.success("Đăng nhập thành công!");
            form.resetFields();
            onClose();
        } catch (err: any) {
            console.error(err);
            message.error(err.message || "Đăng nhập thất bại!");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        message.info(`Đăng nhập bằng ${provider}`);
    };

    return (
        <div>
            <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>Đăng Nhập</Title>

            <Form form={form} layout="vertical" size="large" onFinish={onFinish} initialValues={{ remember: true }}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Vui lòng nhập email!" }, { type: "email", message: "Email không hợp lệ!" }]}
                >
                    <Input prefix={<MailOutlined style={{ color: "#ff4d8d" }} />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                >
                    <Input.Password prefix={<LockOutlined style={{ color: "#ff4d8d" }} />} placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: "#ff4d8d", borderRadius: 8, width: "60%" }}>
                        Đăng Nhập
                    </Button>
                </Form.Item>

                {onSwitchToRegister && (
                    <Form.Item style={{ textAlign: "center" }}>
                        <Button type="link" onClick={onSwitchToRegister}>
                            Chưa có tài khoản? Đăng ký ngay
                        </Button>
                    </Form.Item>
                )}

                <Divider>
                    <Text type="secondary">Hoặc đăng nhập bằng</Text>
                </Divider>

                <Row gutter={16}>
                    <Col span={12}>
                        <Button block size="large" onClick={() => handleSocialLogin("Google")} style={{ background: "#fff", border: "1px solid #d9d9d9", fontWeight: 500 }}>
                            <GoogleOutlined style={{ color: "#DB4437", marginRight: 8 }} />
                            Google
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button block size="large" onClick={() => handleSocialLogin("Github")} style={{ background: "#333", color: "#fff", border: "none" }}>
                            <GithubOutlined style={{ marginRight: 8 }} />
                            Github
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
