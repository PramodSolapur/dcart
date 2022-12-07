import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCartContext from "../context/cartContext";

const Navbar = () => {
  const { totalCartItems } = useCartContext();
  return (
    <header>
      <Link to="/">
        <h1>EKart.</h1>
      </Link>
      <nav>
        <div className="cart-icon">
          <Link to="/cart">
            <FaShoppingCart size={28} color="white" />
            <span className="badge">{totalCartItems}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
