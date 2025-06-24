import { RouterProvider } from "react-router-dom";
import router from "./router/appRouter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "./store/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchCart({userId: "da"}))
  // },[])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
