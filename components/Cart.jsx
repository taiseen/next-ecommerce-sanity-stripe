import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { TiDeleteOutline } from 'react-icons/ti';
import { urlFor } from '../lib/client';
import { useRef } from 'react';
import getStripe from '../lib/getStripe';
import toast from 'react-hot-toast';
import Link from 'next/link';


const Cart = () => {

  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();


  // for stripe payment system...
  const handleCheckout = async () => {
    console.log('click...');

    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    // show a notification for user...
    toast.loading('Redirecting...', {
      style: {
        background: '#CFD8DC'
      },
    });

    stripe.redirectToCheckout({ sessionId: data.id });
  }



  return (
    <div
      ref={cartRef}
      className="cart-wrapper"
      onClick={() => setShowCart(false)}>

      <div className="cart-container">

        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">
            ({totalQuantities} items)
          </span>
        </button>

        {
          cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>

              <Link href="/" passHref>
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  className="btn"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )
        }

        <div className="product-container">
          {
            cartItems.length >= 1 && cartItems.map((item) => (
              <div className="product" key={item?._id}>

                <img src={urlFor(item?.image[0])} className="cart-product-image" alt={item?.name} />

                <div className="item-desc">

                  <div className="flex top">
                    <h5>{item?.name}</h5>
                    <h4>${item?.price}</h4>
                  </div>

                  <div className="flex bottom">

                    <div>
                      <p className="quantity-desc">

                        {/* for decrementing product quantity */}
                        <span className="minus" onClick={(e) => {
                          // for preventing parent onClick event...
                          e.stopPropagation();
                          toggleCartItemQuantity(item?._id, 'dec');
                        }}>
                          <AiOutlineMinus />
                        </span>

                        <span className="num">{item?.quantity}</span>

                        {/* for incrementing product quantity */}
                        <span className="plus" onClick={(e) => {
                          // for preventing parent onClick event...
                          e.stopPropagation();
                          toggleCartItemQuantity(item?._id, 'inc');
                        }}>
                          <AiOutlinePlus />
                        </span>

                      </p>
                    </div>

                    {/* for remove product from cart */}
                    <button
                      type="button"
                      className="remove-item"
                      onClick={(e) => {
                        // for preventing parent onClick event...
                        e.stopPropagation();
                        onRemove(item)
                      }}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {
          cartItems.length >= 1 && (
            <div className="cart-bottom">

              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>

              <div className="btn-container">
                <button type="button" className="btn" onClick={handleCheckout}>
                  Pay with Stripe
                </button>
              </div>

            </div>
          )
        }

      </div>
    </div>
  )
}

export default Cart