import { useQuery } from "@tanstack/react-query";
import { getHomeProducts } from "../api/product/productServices";
import ProductCard from "../components/ProductCard";
import ProductCardsSK4x1 from "../components/skeletons/products/ProductCardsSK4x1";

const AllProdctsPage = () => {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["homeProducts"],
    queryFn: getHomeProducts,
  });
  return (
    <div className="min-h-screen">
      <section>
        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold text-cyan-400 mb-4 font-mono">
                PLAYSTATION_CONSOLES
              </h3>
              <p className="text-cyan-300 font-mono">
                &gt; Next-gen PlayStation gaming consoles for ultimate
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
                XBOX_CONSOLES
              </h3>
              <p className="text-cyan-300 font-mono">
                &gt; Powerful Xbox gaming consoles for elite gaming experience
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
                PLAYSTATION_ACCESSORIES
              </h3>
              <p className="text-cyan-300 font-mono">
                &gt; Premium PlayStation accessories and gaming gear
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
                XBOX_ACCESSORIES
              </h3>
              <p className="text-cyan-300 font-mono">
                &gt; High-performance Xbox accessories and gaming peripherals
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
      </section>
    </div>
  );
};

export default AllProdctsPage;
