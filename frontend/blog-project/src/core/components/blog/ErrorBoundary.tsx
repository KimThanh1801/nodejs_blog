import { Component, type ReactNode } from "react";
import { Alert } from "antd";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Alert message="Đã xảy ra lỗi trong component" type="error" showIcon />;
    }
    return this.props.children;
  }
}
