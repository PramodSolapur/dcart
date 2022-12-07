import useCartContext from "../context/cartContext";

const Cart = ({ id, image, title, quantity, price }) => {
  const {
    removeItemFromCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  } = useCartContext();

  return (
    <div className="cartDetails">
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <div className="title">
        <h5>{title}</h5>
      </div>
      <div className="price">
        <p>${price}</p>
      </div>
      <div className="qty">
        <button onClick={() => decreaseCartItemQuantity(id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => increaseCartItemQuantity(id)}>+</button>
      </div>
      <div className="total">
        <p>{(quantity * price).toFixed(2)}</p>
      </div>
      <button className="remove" onClick={() => removeItemFromCart(id)}>
        Remove
      </button>
    </div>
  );
};

export default Cart;
