import Toast from "./Toast";
import { useSelector } from "react-redux";
import { getAppState } from "../../store/app/appSlice";

const Notification = () => {
  const { toasts } = useSelector(getAppState);

  return (
    <>
      {/* Toast Container - Fixed position */}
      <div className="fixed top-4 sm:right-4 z-50 space-y-2 px-2 sm:px-0 w-full sm:w-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
          />
        ))}
      </div>
    </>
  );
};

export default Notification;
