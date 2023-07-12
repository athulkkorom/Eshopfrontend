import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const Products = () => {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
      const admintoken = localStorage.getItem('admintoken')
        if(!admintoken){
            navigate('/admin/login')
    
        }  
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

  const deletePost = async (slug) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/slug/${slug}`);
      setProducts(products.filter((product) => product.slug !== slug));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Featured products</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p>
                <strong>
                  Rating: {product.rating}, (Reviews: {product.numReviews})
                </strong>
              </p>
              <p>
                <strong>Price: {product.price}/-</strong>
              </p>
              <Button variant="warning" onClick={() => deletePost(product.slug)}>
                Delete Post
              </Button>{' '}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
