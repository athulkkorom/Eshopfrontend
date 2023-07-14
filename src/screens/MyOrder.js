import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const navigate = useNavigate()
    const [order, setOrder] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
        try {
         
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/myorder/email/${user.user.email}`);
          console.log(response.data); // Log the response data to inspect its structure
          setOrder(response.data);
        } catch (error) {
          console.log('Error fetching product data:', error);
        }
      };
      useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/login')
    
        }
       
    
        fetchData();
      }, [user.user.email]);
  return (
  <div className="container">
      {order.products && order.products.map((product) => (
        <div className="order">
        <img className="orderImage" src={product.product.image} alt="" />
        <h3>{product.product.name}</h3>
        <h4>Oederd Adress:{product.Name},{product.Address}</h4>
        <h4>price:{product.product.price}</h4>
        <br />
        </div>
      ))}
    
  </div>
);

    } 
export default MyOrder;