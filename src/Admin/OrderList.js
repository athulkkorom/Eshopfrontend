import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderList = () => {
    const [orders,setOrders] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get('http://localhost:5000/orders');
            setOrders(result.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData()
      }, []);
    return (
        <div className='container'>
          <h1>Orders List</h1>
          <Link to={'/admin'}>
          <p>return to Admin Home page</p>
          </Link>
       <div>
    {orders.map((order) => (
      <div key={order._id}>
        {order.products.map((product) => (
          <div key={product._id}>
            <h3>Name:{product.Name}</h3> 
            <h3>Address:{product.Address}</h3>
            <h3>pincode:{product.pincode}</h3>
            <h3>mobile:{product.mobileNo}</h3>
            <h3>payment:{product.payment}</h3> 
            <h3>product:{product.product.name}</h3>  
            <h3>price:{product.product.price}</h3>   
            <br />    
            <br />  
          </div>
        ))}
       
        
      </div>
    ))}
  </div>
      </div>
      );
}
 
export default OrderList;