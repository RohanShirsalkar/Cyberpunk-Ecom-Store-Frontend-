import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import { getHomeProducts } from "../../api/product/productServices";
import ProductCardsSK4x1 from "../skeletons/products/ProductCardsSK4x1";

const FeaturedProducts = () => {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["homeProducts"],
    queryFn: getHomeProducts,
  });

  return (
    <section>
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-cyan-400 mb-4 font-mono">
              FEATURED_TECH
            </h3>
            <p className="text-cyan-300 font-mono">
              &gt; Next-gen gaming consoles and exclusive hardware for ultimate
              performance
            </p>
          </div>

          {isLoading ? (
            <ProductCardsSK4x1 />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {productsData?.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-cyan-400 mb-4 font-mono">
              TOP_ACCESSORIES
            </h3>
            <p className="text-cyan-300 font-mono">
              &gt; High-performance gaming gear and accessories for elite
              players
            </p>
          </div>

          {isLoading ? (
            <ProductCardsSK4x1 />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {productsData?.accessories.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
