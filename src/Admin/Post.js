import { Container } from "react-bootstrap";
import {useForm} from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const Post = () => {
  useEffect(()=>{
    const admintoken = localStorage.getItem('admintoken')
      if(!admintoken){
          navigate('/admin/login')
  
      }
  
      })
  
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit =(data)=>{axios.post(`http://localhost:5000/upload`, data)
  .then(response => {
    console.log('success')
    
    navigate('/admin');

  
  })
  .catch(error => {
    console.log(error.response.data);
  
  });

  }
   
    return (  
        <Container className="small-container">
            <h1 className="my-3">Upload Page</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Name
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      {...register("name", { required: true})} 
    />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Slug
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputPassword1"
      {...register("slug", { required: true})} 
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Description
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputPassword1"
      {...register("description", { required: true})} 
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Price
    </label>
    <input
      type="number"
      className="form-control"
      id="exampleInputPassword1"
      {...register("price", { required: true})} 
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Brand
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputPassword1"
      {...register("brand", { required: true})} 
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Count in stock
    </label>
    <input
      type="number"
      className="form-control"
      id="exampleInputPassword1"
      {...register("countInStock", { required: true})} 
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Rating
    </label>
    <input
      type="number"
      className="form-control"
      id="exampleInputPassword1"
      {...register("rating", { required: true})} 
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Categary
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputPassword1"
      {...register("categary", { required: true})} 
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Num of reaviews
    </label>
    <input
      type="number"
      className="form-control"
      id="exampleInputPassword1"
      {...register("numReviews", { required: true})} 
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Image url
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputPassword1"
      {...register("image", { required: true})} 
    />
  </div>
  <button type="submit" className="btn btn-primary">
    Upload post Data
  </button>
</form>
<Link to={'/admin'}>
<a>Back to home? </a>
</Link>

        </Container>
    );
}
 
export default Post;