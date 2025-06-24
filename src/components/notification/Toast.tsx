import { useEffect, useState } from "react";
import { X, Check, Info } from "lucide-react";
import { removeToast } from "../../store/app/appSlice";
import { useDispatch } from "react-redux";

type Props = {
  id: number;
  type: string;
  title: string;
  message: string;
};

const Toast = ({ id, type, title, message }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      dispatch(removeToast(id));
    }, 300);
  };

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          gradient: "from-green-500 via-emerald-500 to-cyan-500",
          border: "border-green-400",
          icon: <Check />,
          glow: "shadow-green-500/50",
        };
      case "error":
        return {
          gradient: "from-red-500 via-pink-500 to-purple-500",
          border: "border-red-400",
          icon: <X />,
          glow: "shadow-red-500/50",
        };
      case "info":
      default:
        return {
          gradient: "from-cyan-500 via-blue-500 to-purple-500",
          border: "border-cyan-400",
          icon: <Info />,
          glow: "shadow-cyan-500/50",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`
        relative mb-4 p-4 w-full sm:min-w-80 sm:max-w-96
        bg-black/90 backdrop-blur-sm
        transform transition-all duration-300 ease-out
        ${
          isVisible && !isExiting
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }
        hover:scale-105
        group cursor-pointer
      `}
      onClick={handleClose}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${styles.gradient} opacity-15 group-hover:opacity-30 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative z-10 flex items-start space-x-3">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${styles.gradient} flex items-center justify-center text-black font-bold text-sm`}
        >
          {styles.icon}
        </div>

        {/* Message content */}
        <div className="flex-1 min-w-0">
          <div className="text-white font-bold text-sm tracking-wide uppercase">
            {title}
          </div>
          <div className="text-gray-300 text-sm mt-1 leading-relaxed">
            {message}
          </div>
        </div>

        {/* Close button */}
        <button
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200 text-lg font-bold"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          <X />
        </button>
      </div>

      {/* Corner accents */}
      <div
        className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${styles.border}`}
      />
      <div
        className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${styles.border}`}
      />
      <div
        className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${styles.border}`}
      />
      <div
        className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${styles.border}`}
      />

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${styles.gradient} animate-pulse`}
        style={{
          width: "100%",
          animation: "shrink 5s linear forwards",
        }}
      />

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
