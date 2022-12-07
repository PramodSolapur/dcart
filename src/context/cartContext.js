import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const totalCartItems =
    cart.length > 0 ? cart.reduce((acc, item) => (acc += item.quantity), 0) : 0;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCartItem = (product) => {
    // check product is there or not
    const productExist = cart.find((prod) => prod.id === product.id);
    if (productExist) {
      const updatedCart = cart.map((prod) => {
        if (prod.id === product.id) {
          return {
            ...prod,
            quantity: prod.quantity + 1,
          };
        }
        return prod;
      });
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeItemFromCart = (id) => {
    const newCartItems = cart.filter((prod) => prod.id !== id);
    setCart(newCartItems);
  };

  const increaseCartItemQuantity = (id) => {
    const cartItems = cart.map((prod) => {
      if (prod.id === id) {
        return {
          ...prod,
          quantity: prod.quantity + 1,
        };
      }
      return prod;
    });
    setCart(cartItems);
  };

  const decreaseCartItemQuantity = (id) => {
    const cartItems = cart
      .map((prod) => {
        if (prod.id === id) {
          return {
            ...prod,
            quantity: prod.quantity - 1,
          };
        }
        return prod;
      })
      .filter((prod) => prod.quantity !== 0);

    setCart(cartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCartItem,
        totalCartItems,
        removeItemFromCart,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export default useCartContext;
