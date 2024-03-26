import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import cart from "../Assets/cart_icon.png";
import logo from "../Assets/logo.png";
import { ShopContext } from "../../Context/ShopContext";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../lib/apis/authApi";
import { useGetCurrentUserMutation } from "../../lib/apis/userApi";
import navdropdown from "../Assets/navdropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState("Shop");
  const { getTotalCartItems } = useContext(ShopContext);

  const [logoutUser, { isSuccess }] = useLogoutUserMutation();
  const [getCurrentUser, { data }] = useGetCurrentUserMutation();
  const menuRef = useRef();

  const { user } = useSelector((state) => state.userState);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
        <img src={logo} alt="" width={"30px"}/>
        <p className="d-inline">SHOPPER</p>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link style={{textDecoration:'none'}} to='/'>Shop</Link>
            </li>
            <li className="nav-item">
            <Link style={{textDecoration:'none'}}  to='/men'>Men</Link>
            </li>

            <li className="nav-item">
            <Link style={{textDecoration:'none'}}  to='/women'>Women</Link>
            </li>

            <li className="nav-item">
            <Link style={{textDecoration:'none'}}  to='/kids'>Kids</Link>
            </li>
           
  
          </ul>

          {!user &&  <Link to='/login' className="login-btn">Login</Link>}
      {user &&  <Link onClick={logoutUser} className="login-btn">Logout</Link>}
          <Link to="/cart" className="position-relative">
            <img src={cart} alt="" />{" "}
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">4</span>
          </Link>
        </div>
      </div>
    </nav>
    //     <div className='navbar'>
    //         <div className='nav-logo'>
    //         <img src={logo} alt=""/>
    //         <p>SHOPPER</p>

    //         </div>

    //         <img className="nav-dropdown"onClick={dropdown_toggle} src={navdropdown} alt=""/>
    //         <ul ref={menuRef}  className="nav-menu">
    // <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
    // <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration:'none'}}  to='/men'>Men</Link>{menu==="men"?<hr/>:<></>}</li>
    // <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration:'none'}}  to='/women'>Women</Link>{menu==="women"?<hr/>:<></>}</li>
    // <li onClick={()=>{setMenu("kid")}}><Link style={{textDecoration:'none'}}  to='/kid'>Kid</Link>{menu==="kid"?<hr/>:<></>}</li>
    // </ul>

    // <div className="nav-login-cart">
    //   {!user &&  <Link to='/login'><button>Login</button></Link>}
    //   {user &&  <Link onClick={logoutUser}><button>Logout</button></Link>}

    //     <Link to='/cart'><img src={cart} alt=""/></Link>
    //     <div className="nav-cart-count">{getTotalCartItems()}</div>
    // </div>

    //     </div>
  );
};

export default Navbar;
