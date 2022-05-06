import { useStateContext } from './../context/StateContext';
import { AiOutlineShopping } from 'react-icons/ai'
import Link from 'next/link';
import Cart from './Cart';


const Navbar = () => {

  const { showCart, setShowCart, cartItems } = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
          HeadPhones
        </Link>
      </p>

      <button
        type='button'
        className='cart-icon'

        // Just toggling OR (true)on / (false)off Cart UI at users display... 🛒
        onClick={() => setShowCart(prevShowCart => !prevShowCart)}>
        <AiOutlineShopping />

        {/* Just display the Total Number of product from Cart length... 🛒  */}
        <span className='cart-item-qty'>{cartItems.length}</span>

      </button>

      { // toggling for displaying... Cart <Component /> 🛒
        showCart && <Cart />
      }
    </div>
  )
}

export default Navbar