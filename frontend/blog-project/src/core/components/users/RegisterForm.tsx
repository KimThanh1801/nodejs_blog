import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { registerUser, type RegisterFormValues } from "../../../api/userAPI";

const { Title, Text } = Typography;
const PINK = "#ff4d8d";

interface RegisterFormProps {
    onSubmitSuccess?: () => void;
    onSwitchToLogin?: () => void;
}
export default function RegisterForm({
    onSubmitSuccess,
    onSwitchToLogin,
}: RegisterFormProps) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm<RegisterFormValues>();
    const navigate = useNavigate();

    const onFinish = async (values: RegisterFormValues & { confirmPassword: string }) => {
        setLoading(true);
        try {
            const data = await registerUser({
                fullName: values.fullName,
                email: values.email,
                password: values.password,
            });

            console.log("Đăng ký thành công:", data);
            message.success("Đăng ký thành công!");
            form.resetFields();

            if (onSubmitSuccess) {
                onSubmitSuccess();
            } else {
                navigate("/login");
            }
        } catch (err: any) {
            console.error(err);
            message.error(err.message || "Đăng ký thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
                Đăng Ký
            </Title>

            <Form
                // form={form}
                layout="vertical"
                size="large"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="fullName"
                    rules={[
                        { required: true, message: "Vui lòng nhập họ tên!" },
                        { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined style={{ color: PINK }} />}
                        placeholder="Họ và tên"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: "email", message: "Email không hợp lệ!" },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined style={{ color: PINK }} />}
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu!" },
                        { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined style={{ color: PINK }} />}
                        placeholder="Mật khẩu"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Mật khẩu không khớp!"));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined style={{ color: PINK }} />}
                        placeholder="Xác nhận mật khẩu"
                    />
                </Form.Item>

                <Form.Item style={{ textAlign: "center", marginBottom: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        size="large"
                        style={{
                            backgroundColor: PINK,
                            width: "60%",
                            borderRadius: 8,
                        }}
                    >
                        Đăng Ký
                    </Button>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Text type="secondary">
                        Đã có tài khoản?{" "}
                        <Button
                            type="link"
                            onClick={() =>
                                onSwitchToLogin ? onSwitchToLogin() : navigate("/login")
                            }
                        >
                            Đăng nhập ngay
                        </Button>
                    </Text>
                </Form.Item>
            </Form>
        </div>
    );
}
