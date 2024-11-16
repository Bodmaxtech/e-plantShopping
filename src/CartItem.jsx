import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Handle increment of quantity
  const handleIncrement = (name) => {
    const item = cartItems.find((item) => item.name === name);
    dispatch(updateQuantity({ name, quantity: item.quantity + 1 }));
  };

  // Handle decrement of quantity
  const handleDecrement = (name) => {
    const item = cartItems.find((item) => item.name === name);
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(name));
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  // Calculate the total cost for an individual item
  const calculateTotalCost = (item) => {
    return item.price * item.quantity;
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + calculateTotalCost(item), 0);
  };

  // Handle continue shopping functionality
  const handleContinueShopping = (e) => {
    onContinueShopping(); // Call the parent function passed as prop
  };
  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


