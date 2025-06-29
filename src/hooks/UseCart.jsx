import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';

export const UseCart = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context
}
