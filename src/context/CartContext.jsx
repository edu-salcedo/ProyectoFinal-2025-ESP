
import { createContext, useState } from "react";

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  const addToCart = (product) => {
    // buscamos si el producto ya existe en el carrito
    const itemIndex = cart.findIndex((item) => item.id === product.id);

    // si el producto ya existe, incrementamos su cantidad
    if (itemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += 1;
      return setCart(updatedCart);
    }
    // si el producto no existe, lo agregamos al carrito con cantidad 1

    setCart(prevState => ([...prevState, { ...product, quantity: 1 }]))
  };

  const addProductQuantity = (idProduct) => {
    const updatedCart = cart.map((item) => {
      if (item.id === idProduct) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };
  const restProductQuantity = (idProduct) => {
    const updatedCart = cart.map((item) => {
      if (item.id === idProduct) {
        //devolvemos el producto con la cantidad restada, pero si es mayor a 1
        return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };
  const removeProduct = (idProduct) => {
    const updatedCart = cart.filter((item) => item.id !== idProduct);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
  }

  return (
    <CartContext.Provider value={{ cart, setCart, clearCart, addToCart, addProductQuantity, restProductQuantity, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
}





