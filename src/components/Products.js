import { useEffect } from "react";
import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import useCartContext from "../context/cartContext";
import useProductContext from "../context/productContext";
import Loading from "./Loading";

const Products = () => {
  const { fetchAllProducts, products, isLoading } = useProductContext();
  const { addToCartItem } = useCartContext();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const addToCart = (product) => {
    addToCartItem(product);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="products-container">
      <h1>LATEST PRODUCTS</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="image">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
              </Link>
            </div>
            <div className="prod-info">
              <p>{product.title}</p>
              <p>Price : $ {product.price}</p>
              <span className="rating">
                <FiStar size={24} color="#f4d143" />
                <span>{product.rating.rate}</span>
              </span>
            </div>
            <div className="cart-btn">
              <button type="button" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
