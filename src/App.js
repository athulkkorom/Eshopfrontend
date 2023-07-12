import React from 'react';
import {BrowserRouter, Link, Route, Routes, } from 'react-router-dom';
import './App.css';
import Homescreen from './screens/Homescreen'
import Productscreen from './screens/Productscreen'
import LogininScreen from './screens/LoginScreen';
import Orderscreen from './screens/Orderscreen';
import Signup from './screens/Signup';
import Home from './Admin/Home ';
import Post from './Admin/Post';
import Cart from './screens/Cart';
import Products from './Admin/Products';
import AdminLogin from './Admin/AdminLogin';
import OrderList from './Admin/OrderList';
import MyOrder from './screens/MyOrder';
function App() {
  const logOut = ()=>{
   const admintoken = localStorage.getItem('admintoken')
   if(admintoken){
    localStorage.removeItem('admintoken');
   }
  }

  return (
    <BrowserRouter>
    <div className="d-flex flex-column site-container">
      <header>
        <Link to='/'>Amazona</Link>
        {window.location.pathname === "/" && (
    <div className="d-flex flex-row-reverse">
      {
        localStorage.getItem('token')?(  <p onClick={()=>{localStorage.removeItem('token')}} className="p-2">Logout</p>):(
          <Link to="/login">
          <p className="p-2">Login</p>
      </Link>
        )
      }
      <Link to="/cart">
        <p className="p-2">Cart</p>
      </Link>
      <Link to="/myorder">
        <p className="p-2">My orders</p>
      </Link>
    </div>
  )}
     {window.location.pathname === "/admin" && (
    <div className="d-flex flex-row-reverse">cd 
      <Link to='/admin/login'>
        <p onClick={logOut} className="p-2">Logout</p>
        </Link>
    </div>
  )}
      </header>
      <main>
        <Routes>
        <Route path='/order/:slug' element={<Orderscreen />} />
        <Route path='/product/:slug' element={<Productscreen />} />
        <Route path='/login' element={<LogininScreen />} />
        <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Homescreen />} />
          <Route path='/Admin' element={<Home />} />
          <Route path='/Admin/login' element={<AdminLogin />} />
          <Route path='/Admin/orders' element={<OrderList />} />
          <Route path='/deleteproducts' element={<Products />} />
          <Route path='/post' element={<Post />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/myorder' element={<MyOrder />} />
        </Routes>
      </main>
      <footer>
        <div className='text-center'>@All Rights Reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
