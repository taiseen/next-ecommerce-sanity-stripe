import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';


const Context = createContext();


export const StateContext = ({ children }) => {

  const [totalQuantities, setTotalQuantities] = useState(0); // 📌
  const [totalPrice, setTotalPrice] = useState(0); // 💰
  const [showCart, setShowCart] = useState(false); // 🛒
  const [cartItems, setCartItems] = useState([]); // 🛒
  const [qty, setQty] = useState(1); // 📌



  // this function used by 🟩 "ProductInfo" [slug].js <Component/>
  // 🟡🟡🟡 for product increment button...
  const incQty = () => setQty(prevQty => prevQty + 1);


  // this function used by 🟩 "ProductInfo" [slug].js <Component/>
  // 🟡🟡🟡 for product decrement button...
  const decQty = () => setQty(prevQty => {
    if ((prevQty - 1) < 1) return 1;
    return prevQty - 1;
  });


  // this function used by 🟩 "ProductInfo" [slug].js <Component/>
  // 🟡🟡🟡 for add ➕ product into cart [array]... 🛒
  const addProductIntoCart = (product, quantity) => {

    // 1st) ✅ find that product is already exist in the cart [array] OR not? 🛒
    const checkProductInCart = cartItems.find(p => p._id === product._id);


    // 2nd) ✅ if product already exist/present in cart 🛒
    if (checkProductInCart) {
      //  2.1) ✅ just display a toast notification for user...
      toast.success(`This product already added into cart.`, {
        duration: 3000,
        style: {
          background: '#FFECB3'
        },
      });
    }
    // 3rd) ✅ if product is ❗❗❗NOT exist/present into cart... 🛒
    else {
      // 3.1) ✅ add new 'quantity' property, with its existing property...
      product.quantity = quantity;

      // 🔴🔴 very very important statement OR heart section for cart... 🔴🔴
      // 3.2) ✅ add or update cart [array] for product, by the help of useState variable...
      setCartItems([...cartItems, { ...product }]); // 🛒

      // 3.3) ✅ calculate "ALL Total Price" of product's that user added into cart...
      setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);

      // 3.4) ✅ keep tracking for "ALL Product's" that user added into cart...
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);

      // 3.5) ✅ display a toast notification for user about product...
      toast.success(`${qty} ${product.name} - added into cart.`, {
        style: {
          background: '#F1F8E9'
        },
      });
    }
  }



  // this function used by 🟩 "Cart" <Component/> 🛒
  // 🔴🔴🔴 for manipulation product quantity... inside Cart <Component /> 🛒
  const cartItemsManipulation = (id, value) => {

    // 1st) ✅ find 🔎 this product is exist inside cart [array] OR not? 🛒
    const foundProduct = cartItems.find(item => item._id === id);

    // 2nd) ✅ if user press "Decrement" btn from Cart <Component /> 🛒
    if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        // 2.1) 🟢 loop inside cart [array] 🛒 for find 🔎 this product...
        // & ➖ decrease "quantity" property from foundProduct variable...
        const updatedProduct = cartItems.map(item => item._id === id
          ? { ...foundProduct, quantity: foundProduct.quantity - 1 }
          : item
        );
        // 2.2) 🟢 update that cart [array] 🛒 for new product value...
        setCartItems(updatedProduct);

        // 2.3) 🟢 minus ➖ that Product Price also from "totalPrice" useState variable...
        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)

        // 2.4) 🟢 minus ➖ that Product Quantity also from "totalQuantities" useState variable...
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
    // 3rd) ✅ if user press "Increment" btn from Cart <Component /> 🛒
    else {
      // 3.1) 🟢 loop inside cart [array] 🛒 for find 🔎 that product...
      // & ➕ increase "quantity" property from foundProduct variable...
      const updatedProduct = cartItems.map(item => item._id === id
        ? { ...foundProduct, quantity: foundProduct.quantity + 1 }
        : item
      );

      // 3.2) 🟢 update that cart [array] 🛒 for new product value...      
      setCartItems(updatedProduct);

      // 3.3) 🟢 plus ➕ that Product Price also into "totalPrice" useState variable...
      setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)

      // 3.4) 🟢 plus ➕ that Product Quantity also into "totalQuantities" useState variable...
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    }
  }


  // this function used by 🟩 "Cart" <Component/> 🛒
  // 🔴🔴🔴 for remove ➖ product from cart... 🛒
  const removeProductFromCart = (product) => {

    // 1st) ✅ remove this product from cart [array] 🛒
    const newCartItems = cartItems.filter(item => item._id !== product._id);

    // 2nd) ✅ update cart [array] 🛒 for new product value... 
    setCartItems(newCartItems);

    // 3rd) ✅ minus ➖ this product total price also, from "totalPrice" useState variable...
    setTotalPrice(prevTotalPrice => prevTotalPrice - (product.price * product.quantity));

    // 4th) ✅ minus ➖ this product total quantity also, from "totalQuantities" useState variable...
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - product.quantity);

    // 5th) ✅ just inform user this product remove from cart [array] 🛒 by toast notification
    toast.success(`${product.name} - remove from cart.`, {
      position: 'top-right',
      style: {
        background: '#FFCCBC'
      },
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
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        addProductIntoCart,
        removeProductFromCart,
        cartItemsManipulation,
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