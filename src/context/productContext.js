import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});

  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const fetchSingleProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setSingleProduct(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        fetchAllProducts,
        products,
        isLoading,
        fetchSingleProduct,
        singleProduct,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export default useProductContext;
