import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Cart = () => {
  const navigate =useNavigate()

  const [cart, setCart] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchData = async () => {
    try {
     
      const response = await axios.get(`http://localhost:5000/cart/email/${user.user.email}`);
      console.log(response.data); // Log the response data to inspect its structure
      setCart(response.data);
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
  
  const removeCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const res = await axios.put('http://localhost:5000/cart/remove', {
      email: user.user.email,
      productId
    });
    const data= await res.data
    if(data.message){
      fetchData()
      alert(data.message)
    }else{
      alert('failed')
    }
  };

  return (
    <div className='container'>
      {cart.products && cart.products.length > 0 ? (
        <div>
          {cart.products.map((product, index) => (
            <div key={index}>
              <Link to={`/product/${product.slug}`}>
                <img className='cartimage' src={product.image} alt={product.name} />
              </Link>
              <Link to={`/product/${product.slug}`}>
                <h3>{product.name}</h3>
                </Link>
                <button onClick={() => removeCart(product._id)}>Remove from Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Cart;
