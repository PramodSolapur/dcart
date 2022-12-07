import Cart from "../components/Cart";
import useCartContext from "../context/cartContext";

const CartPage = () => {
  const { cart, totalCartItems } = useCartContext();

  const subtotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const devileryAmount = subtotal > 200 ? 0 : subtotal * 0.15;

  const total = subtotal + devileryAmount;

  return (
    <div className="container">
      <div className="cart-container">
        <h1>{cart.length > 0 ? "Your Cart" : "Your Cart is Empty, Buy Now"}</h1>
        {cart.length > 0 && (
          <div className="cart">
            <div className="leftContainer">
              <div className="topContainer">
                <p>Image</p>
                <p>Name</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p></p>
              </div>
              <div className="innerContainer">
                {cart.map((prod) => (
                  <Cart key={prod.id} {...prod} />
                ))}
              </div>
            </div>
            <div className="cart-info">
              <div className="shippingFee">
                <h3>Total Items ({totalCartItems})</h3>
                <h3>Subtotal Amount : ${subtotal.toFixed(2)} </h3>
                <h3>Delivery Amount : ${devileryAmount.toFixed(2)}</h3>
                <h3>Total Amount : ${total.toFixed(2)}</h3>
                <button>Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
