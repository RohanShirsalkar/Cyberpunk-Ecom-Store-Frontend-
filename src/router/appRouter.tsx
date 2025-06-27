import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../layout/Layout";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import AllProdctsPage from "../pages/AllProdctsPage";
import PageNotFound from "../pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/product-details/:productId", element: <ProductDetailsPage /> },
      { path: "/all-products", element: <AllProdctsPage /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

export default router;
