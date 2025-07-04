import { Outlet } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthDialog from "../components/auth/AuthDialog";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth/authSlice";
import Notification from "../components/notification/Notification";
import CartDialog from "../components/cart/CartDialog";
import { getCartState } from "../store/cart/cartSlice";

const layout = () => {
  const { isAuthDialogOpen } = useSelector(getAuthState);
  const { isCartOpen } = useSelector(getCartState);
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <Notification />
        {isCartOpen && <CartDialog />}
        {isAuthDialogOpen && <AuthDialog />}
        <main>
          <Outlet />
        </main>
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
