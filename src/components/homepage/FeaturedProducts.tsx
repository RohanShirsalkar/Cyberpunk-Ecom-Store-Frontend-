import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import { getAllProducts } from "../../api/product/productServices";
import ProductCardsSK4x1 from "../skeletons/products/ProductCardsSK4x1";

const FeaturedProducts = () => {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4 font-mono">
            FEATURED_TECH
          </h3>
          <p className="text-cyan-300 font-mono">
            &gt; Premium cybernetic enhancements available for immediate
            download
          </p>
        </div>

        {isLoading ? (
          <ProductCardsSK4x1 />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsData?.products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
