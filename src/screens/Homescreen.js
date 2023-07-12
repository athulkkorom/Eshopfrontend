import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const Homescreen = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/products');
        setProducts(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const addToCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    try {
      const res = await axios.post('http://localhost:5000/cart/add', {
        email: user.user.email,
        productId
      });
      const data = await res.data;
      console.log(data);
      if (data.message) {
        navigate(`/cart`);
      } else {
        alert('Error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Amazona</title>
        </Helmet>
        <h1>Featured products</h1>
        <AnimatePresence wait>
          <motion.h3
            className='motion'
            initial={{ x: -1000 }}
            animate={{ x: [1400, -1000] }}
            transition={{
              duration: 30,
              delay: 2,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            exit={{ opacity: 0 }}
          >
            Mega Offer Sale Started On Next Week, India's Biggest Sale, 70% offer on Mobile Allen Solly & All Tshirts
          </motion.h3>
        </AnimatePresence>

        <div className='products'>
          {products.map((product) => (
            <div className='product' key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className='product-info'>
                <Link to={`/product/${product.slug}`}>
                  <p className='product-name'>{product.name}</p>
                </Link>
                <p><strong>Rating: {product.rating}, (Reviews: {product.numReviews})</strong></p>
                <p><strong>Price: {product.price}/-</strong></p>
                <Button variant="warning" onClick={() => addToCart(product._id)}>Add To Cart</Button>{' '}
              </div>
            </div>
          ))}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Homescreen;
