import { RouterProvider } from "react-router-dom";
import router from "./router/appRouter";
import { useEffect } from "react";
import { fetchCart } from "./store/cart/cartSlice";
import useAppDispatch from "./hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getAuthState } from "./store/auth/authSlice";

function App() {
  const { userId } = useSelector(getAuthState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCart({ userId }));
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
