import { Container } from "react-bootstrap";
import {useForm} from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const LoginScreen = () => {
  const navigate = useNavigate();
  useEffect(()=>{
   const token = localStorage.getItem('token')
    if(token){
      navigate('/')
      alert("Allredy Logged in")

    }
  })
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit =(data)=>{axios.post(`http://localhost:5000/login`, data)
  .then(response => {
    console.log(response.data.user._id);
    console.log('success')
    localStorage.setItem("token",response.data.token)
    localStorage.setItem("userId", response.data.user._id)
    localStorage.setItem("user",JSON.stringify(response.data))
    navigate('/');

  
  })
  .catch(error => {
    console.log(error.response.data);
  
  });

  }
   
    return (  
        <Container className="small-container">
            <h1 className="my-3">Login Page</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      {...register("email", { required: true})} 
    />
    <div id="emailHelp" className="form-text">
      We'll never share your email with anyone else.
    </div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      {...register("password", { required: true})} 
    />
  </div>
  <button type="submit" className="btn btn-primary">
    Login
  </button>
</form>
<Link to={'/signup'}>
<a>Are you New here? </a>
</Link>

        </Container>
    );
}
 
export default LoginScreen;