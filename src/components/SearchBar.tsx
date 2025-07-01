import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getSearchedProducts } from "../api/product/productServices";
import ButtonSpinner from "./spinners/ButtonSpinner";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchResults", debouncedSearchQuery],
    queryFn: () => getSearchedProducts({ query: debouncedSearchQuery }),
    enabled: !!debouncedSearchQuery,
  });

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  const handleProductSelect = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/product-details/${productId}`);
  };

  return (
    <div className="relative">
      <div className="hidden sm:block">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="SEARCH DATABASE..."
          className="bg-black bg-opacity-50 text-cyan-100 placeholder-gray-500 font-mono pe-10 px-4 py-2 rounded border border-cyan-400 focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/20 transition-all duration-300"
        />
        {isLoading ? (
          <div className="absolute right-3 top-2.5 h-5 w-5 text-cyan-400">
            <ButtonSpinner />
          </div>
        ) : (
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-cyan-400" />
        )}
      </div>
      <div className="bg-gray-900 bg-opacity-95 backdrop-blur-sm">
        {isSearchOpen && (
          <div className="max-h-96 overflow-y-auto rounded absolute top-2 right-0 bg-black border border-cyan-500">
            {searchResults?.products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductSelect(product._id)}
                className="p-4 border-b border-gray-700 hover:bg-cyan-500/10 hover:border-cyan-400 cursor-pointer transition-all duration-200 group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-cyan-300 font-semibold group-hover:text-cyan-200">
                      {product.name}
                    </div>
                    <div className="text-cyan-600 text-sm mt-1">
                      &gt; {product.category}
                    </div>
                  </div>
                  <div className="text-green-400 font-bold">
                    ${product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
