import { Routes, Route } from "react-router-dom";
import MainLayout from "./core/components/layouts/MainLayout";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
