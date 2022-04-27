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
        onClick={() => setShowCart(prevShowCart => !prevShowCart)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{cartItems.length}</span>
      </button>

      {
        showCart && <Cart />
      }
    </div>
  )
}

export default Navbar