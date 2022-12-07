import { useEffect } from "react";
import { FiStar } from "react-icons/fi";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import useCartContext from "../context/cartContext";
import useProductContext from "../context/productContext";

const ProductDetail = () => {
  const { fetchSingleProduct, singleProduct, isLoading } = useProductContext();
  const { addToCartItem } = useCartContext();

  const { prodId } = useParams();

  useEffect(() => {
    fetchSingleProduct(prodId);
  }, [prodId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="productDetail">
        <div className="prodImage">
          <img src={singleProduct.image} alt={singleProduct.title} />
        </div>
        <div className="prodDetail">
          <div className="title">
            <h1>{singleProduct.title}</h1>
          </div>
          <div className="desc">
            <p>
              {singleProduct?.description?.length > 350
                ? singleProduct.description.substring(0, 350) + "..."
                : singleProduct.description}
            </p>
          </div>
          <div className="category">
            <p>Category : {singleProduct.category}</p>
          </div>
          <div className="price">
            <p>Price : ${singleProduct.price}</p>
          </div>
          <span className="rating">
            <FiStar size={30} color="#f4d143" />
            <span>{singleProduct?.rating?.rate || 0}</span>
          </span>
          <div className="cart-btn">
            <button type="button" onClick={() => addToCartItem(singleProduct)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
