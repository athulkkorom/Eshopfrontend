import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Orderscreen = () => {
  const navigate = useNavigate()
  const params = useParams();
  const { slug } = params;
  const [product, setProduct] = useState({});
  const [states, setStates] = useState({
    Name: '',
    Address: '',
    pincode: '',
    mobileNo: '',
    payment: 'Cash on delivery', // Set default payment option
  });

  const order = async (productId) => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const res = await axios.post('http://localhost:5000/order/add', {
        email: user.user.email,
        productId,
        Name: states.Name,
        Address: states.Address,
        pincode: states.pincode,
        mobileNo: states.mobileNo,
        payment: states.payment,
      });

      const data = await res.data;
      console.log(data);

      if (data.message === 'success') {
        alert('Order placed successfully');
        navigate('/')
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.log('Error placing order:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/slug/${slug}`);
        setProduct(response.data);
      } catch (error) {
        console.log('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <div>
        <div className="mb-3">
          <input
            value={states.Name}
            onChange={(e) => setStates({ ...states, Name: e.target.value })}
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <input
            value={states.Address}
            onChange={(e) => setStates({ ...states, Address: e.target.value })}
            className="address"
            placeholder="Address"
          />
        </div>
        <div className="mb-3">
          <input
            value={states.pincode}
            onChange={(e) => setStates({ ...states, pincode: e.target.value })}
            placeholder="Pincode"
          />
        </div>
        <div className="mb-3">
          <input
            value={states.mobileNo}
            onChange={(e) => setStates({ ...states, mobileNo: e.target.value })}
            placeholder="Mobile Number"
          />
        </div>
        <div className="mb-3">
          <h3>Price: {product.price}</h3>
        </div>
        <div className="mb-3">
          <select
            value={states.payment}
            onChange={(e) => setStates({ ...states, payment: e.target.value })}
          >
            <option value="Cash on delivery">Cash on delivery</option>
            <option value="Online Payment">Online Payment</option>
          </select>
        </div>
      </div>
      <div className="mb-3">
        <button onClick={() => order(product._id)}>Place Order</button>
      </div>
    </div>
  );
};

export default Orderscreen;
