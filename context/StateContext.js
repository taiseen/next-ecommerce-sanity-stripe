import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuanitity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
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