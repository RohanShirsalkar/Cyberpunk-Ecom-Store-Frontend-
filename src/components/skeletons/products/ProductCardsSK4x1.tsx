import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductCardsSK4x1 = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
      {Array.from({ length: 4 }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default ProductCardsSK4x1;
