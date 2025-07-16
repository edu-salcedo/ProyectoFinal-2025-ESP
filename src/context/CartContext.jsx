
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext()

export function CartProvider({ children }) {
  //seteamos el carrito si esta en el localstrage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Guardamos el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
    localStorage.removeItem('cart');
  }

  const sumTotal = () => {
    return cart.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }

  return (
    <CartContext.Provider value={{ cart, setCart, clearCart, addToCart, addProductQuantity, restProductQuantity, removeProduct, sumTotal }}>
      {children}
    </CartContext.Provider>
  );
}





