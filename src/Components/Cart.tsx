import { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState<any>({ cart: [] });
  const [loading, setLoaading] = useState(true);

  useEffect(() => {
    if (loading) {
      const fetchCartItems = async () => {
        try {
          const token: string | null = localStorage.getItem("access");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get(
            "http://127.0.0.1:8000/api/cart/",
            config
          );
          console.log(response.data);
          console.log(response.data.cart);
          console.log(response.data.cart_items);
          setCartItems(response.data);
          setLoaading(false);
        } catch (error) {
          console.error(error);
          setLoaading(false);
        }
      };

      fetchCartItems();
    }
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.cart.map((cartItemGroup: any, index: number) => (
          <li key={index}>
            <h2>Cart: {cartItemGroup.user}</h2>
            <ul>
              {cartItemGroup.cart_items.map((cartItem: any, index: number) => (
                <li key={index}>
                  <p>Product: {cartItem.product.name}</p>
                  <p>Quantity: {cartItem.quantity}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
