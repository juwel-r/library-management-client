import Navbar from "@/common/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
  return (
    <div className="max-w-6xl mx-auto relative">
      <Navbar />
      <div className="mx-2 mt-[64px]"><Outlet /></div>
      <ToastContainer/>
    </div>
  );
};

export default MainLayout;
