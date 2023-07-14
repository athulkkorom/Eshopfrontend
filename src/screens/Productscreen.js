import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Productscreen = () => {
  const navigate = useNavigate()
  const params = useParams();
  const { slug } = params;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
        navigate('/login')
        alert("please log in first")

    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/products/slug/${slug}`);
        setProduct(response.data);
      } catch (error) {
        console.log('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        <Container>
          <Row>
            <Col md={6}>
              <img className="img-large" src={product.image} alt={product.name} />
            </Col>
            <Col md={3}>
              <div className="details">
                <div className="name">{product.name}</div>
                <br />
                Rating: {product.rating}, Num Reviews: {product.numReviews}
                <br />
                Price: {product.price}
                <br />
                {product.description}
              </div>
            </Col>
            <Col md={3}>
              <div className="card">
                <Card>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroupItem>
                        <Row>
                          <Col>Price:</Col>
                          <Col>{product.price}</Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                    <ListGroupItem>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">In stock</Badge>
                          ) : (
                            <Badge bg="danger">Out of stock</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <div className="d-grid">
                        <Link to={`/order/${product.slug}`}>
                          <Button variant="warning">Buy Now</Button>
                          </Link>
                        </div>
                      </Row>
                    </ListGroupItem>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
        <input className='reviews' placeholder='Type your Review'></input>
      </div>
    </HelmetProvider>
  );
};

export default Productscreen;
 