import React, {useContext,useRef,useState} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import cart from '../Assets/cart.png'
import logo from '../Assets/logo.png'
import {ShopContext} from '../../Context/ShopContext'
import navdropdown from '../Assets/navdropdown.png'

 const Navbar = () => {
  const [menu,setMenu] = useState("Shop");
  const {getTotalCartItems}=useContext(ShopContext);
  const menuRef = useRef()

  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');

  }
  
  
  
  return (
    <div className='navbar'>
        <div className='nav-logo'>
        <img src={logo} alt=""/>
        <p>SHOPPER</p>

        
        </div>

        <img className="nav-dropdown"onClick={dropdown_toggle} src={navdropdown} alt=""/>
        <ul ref={menuRef}  className="nav-menu">
<li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
<li onClick={()=>{setMenu("men")}}><Link style={{textDecoration:'none'}}  to='/men'>Men</Link>{menu==="men"?<hr/>:<></>}</li>
<li onClick={()=>{setMenu("women")}}><Link style={{textDecoration:'none'}}  to='/women'>Women</Link>{menu==="women"?<hr/>:<></>}</li> 
<li onClick={()=>{setMenu("kid")}}><Link style={{textDecoration:'none'}}  to='/kid'>Kid</Link>{menu==="kid"?<hr/>:<></>}</li>       
</ul>

<div className="nav-login-cart">
    <Link to='/login'><button>Login</button></Link>
    <Link to='/cart'><img src={cart} alt=""/></Link>
    <div className="nav-cart-count">{getTotalCartItems()}</div>
</div>

    </div>
  )
}


export default Navbar
