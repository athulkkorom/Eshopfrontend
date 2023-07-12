import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import './Home.css';
const Home = () => {
    const navigate = useNavigate();
    useEffect(()=>{
  const admintoken = localStorage.getItem('admintoken')
    if(!admintoken){
        navigate('/admin/login')

    }

    })
  const handleUpload=()=>{
        navigate('/post');

    }
    const deleteUpload=()=>{
        navigate('/deleteproducts');

    }
    const orderList =()=>{
        navigate('/admin/orders')
    }
    return (
        <div className="container">
        <h1>
        Admin Page </h1>
        <h5>Upload A  New Post  <button onClick={handleUpload}>ClickHere</button></h5>
        <h5>Delete Post  <button onClick={deleteUpload}>ClickHere</button></h5>
        <h5>OrderList <button onClick={orderList}>ClickHere</button></h5>
       </div>
      );
}
 
export default Home;