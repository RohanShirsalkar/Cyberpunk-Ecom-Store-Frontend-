import { useQuery } from "@tanstack/react-query";
import { getRecommendedProducts } from "../../api/product/productServices";
import ProductCard from "../ProductCard";

type Props = {
  productId: string;
  category: string;
};

const RecommendedProducts = ({ productId, category }: Props) => {
  const { data: productsData } = useQuery({
    queryKey: ["recomended_products"],
    queryFn: () =>
      getRecommendedProducts({ productId: productId, category: category }),
  });

  return (
    <div>
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 font-mono mb-8">
        Recommended Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {productsData?.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
