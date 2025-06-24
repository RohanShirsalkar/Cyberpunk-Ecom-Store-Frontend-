import { Outlet } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthDialog from "../components/auth/AuthDialog";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth/authSlice";
import Notification from "../components/notification/Notification";

const layout = () => {
  const { isAuthDialogOpen } = useSelector(getAuthState);
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <Notification />
        {isAuthDialogOpen && <AuthDialog />}
        <Outlet />
        <Footer />
      </div>
      <style>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default layout;
