import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';


const Context = createContext();


export const StateContext = ({ children }) => {

  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);

  let foundProduct;


  // for add product into cart
  const onAdd = (product, quantity) => {

    // find that product is already exist in the cart or not?
    const checkProductInCart = cartItems.find(p => p._id === product._id);


    // if product already exist/present in cart
    if (checkProductInCart) {
      // show a notification for user...
      toast.success(`This product already added into cart.`, {
        duration: 3000,
        style: {
          background: '#FFECB3'
        },
      });
    }
    // if product NOT exist/present in cart
    else {
      // add new 'quantity' property with its value...
      product.quantity = quantity;

      // add into state variable
      setCartItems([...cartItems, { ...product }]);

      setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);

      // show a notification for user...
      toast.success(`${qty} ${product.name} - added into cart.`, {
        style: {
          background: '#F1F8E9'
        },
      });
    }
  }


  // for remove product from cart
  const onRemove = (product) => {
    foundProduct = cartItems.find(item => item._id === product._id);
    const newCartItems = cartItems.filter(item => item._id !== product._id);

    setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);

    // show a notification for user...
    toast.success(`${product.name} - remove from cart.`, {
      position: 'top-right',
      style: {
        background: '#FFCCBC'
      },
    });
  }


  // for inside cart... product quantity manipulation
  const toggleCartItemQuantity = (id, value) => {

    foundProduct = cartItems.find(item => item._id === id);
    const index = cartItems.findIndex(product => product._id === id);

    if (value === 'inc') {
      setCartItems(
        cartItems.map((item, i) =>
          i === index
            ? { ...foundProduct, quantity: foundProduct.quantity + 1 }
            : item
        )
      );
      setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if (value === 'dec' && foundProduct.quantity > 1) {
      setCartItems(
        cartItems.map((item, i) =>
          i === index
            ? { ...foundProduct, quantity: foundProduct.quantity - 1 }
            : item
        )
      );
      setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
    }
  }


  // for product increment button...
  const incQty = () => {
    setQty(prevQty => prevQty + 1);
  }


  // for product decrement button...
  const decQty = () => {
    setQty(prevQty => {
      if ((prevQty - 1) < 1) return 1;
      return prevQty - 1;
    });
  }



  return (
    <Context.Provider
      value={{
        qty,
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        setQty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        toggleCartItemQuantity,
      }}
    >

      {children}

    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);









































/* 
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const getLocalStorage = (name) => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem(name);

      if (storage) return JSON.parse(localStorage.getItem(name));

      if (name === 'cartItems') return [];

      return 0;
    }
  };

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(getLocalStorage('cartItems'));
  const [totalPrice, setTotalPrice] = useState(getLocalStorage('totalPrice'));
  const [totalQuantities, setTotalQuantities] = useState(getLocalStorage('totalQuantities'));
  const [qty, setQty] = useState(1);

  let findProduct;
  let index;
  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities));
  }, [cartItems, totalPrice, totalQuantities]);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (cartProduct) => cartProduct._id === product._id,
    );

    if (checkProductInCart) {
      setTotalPrice(totalPrice + product.price * quantity);
      setTotalQuantities(totalQuantities + quantity);

      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
      toast.success(`${qty} ${product.name} added`);
    } else {
      setTotalPrice(totalPrice + product.price * quantity);
      setTotalQuantities(totalQuantities + quantity);
      // eslint-disable-next-line no-param-reassign
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);

      toast.success(`${qty} ${product.name} added`);
    }
  };

  const onRemove = (product) => {
    findProduct = cartItems.find((item) => item._id === product._id);
    const tempCart = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(totalPrice - findProduct.price * findProduct.quantity);
    setTotalQuantities(totalQuantities - findProduct.quantity);
    setCartItems(tempCart);
  };

  const toggleCartItemQuantity = (id, value) => {
    findProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    if (value === 'inc') {
      findProduct.quantity += 1;
      cartItems[index] = findProduct;
      setTotalPrice(totalPrice + findProduct.price);
      setTotalQuantities(totalQuantities + 1);
    }

    if (value === 'dec') {
      if (findProduct.quantity > 1) {
        findProduct.quantity -= 1;
        cartItems[index] = findProduct;
        setTotalPrice(totalPrice - findProduct.price);
        setTotalQuantities(totalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((oldQty) => {
      const tempQty = oldQty + 1;
      return tempQty;
    });
  };

  const decQty = () => {
    setQty((oldQty) => {
      let tempQty = oldQty - 1;
      if (tempQty < 1) {
        tempQty = 1;
      }
      return tempQty;
    });
  };

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        onAdd,
        onRemove,
        cartItems,
        totalPrice,
        totalQuantities,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        showCart,
        incQty,
        decQty,
        qty,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

*/