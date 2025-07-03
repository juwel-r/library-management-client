import Footer from "@/common/Footer";
import Navbar from "@/common/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div className="max-w-6xl mx-auto relative">
      <Navbar />
      <div className="min-h-[calc(100vh-342px)] mx-2 mt-[64px]">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
