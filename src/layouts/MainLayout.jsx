import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
