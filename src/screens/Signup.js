import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('token')
     if(token){
       navigate('/')
       alert("Allredy Logged in")
 
     }
   })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [states, setStates] = useState({
    Name:"",
    email:"",
    password:""
  })

  const onSubmit = (e) => {
    e.preventDefault()
    // console.log(data);
    axios.post(`${process.env.REACT_APP_BACKEND_API}/signup`, states)
      .then(response => {
        console.log(response.data);
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("userId", response.data.user._id)
        localStorage.setItem("user",JSON.stringify(response.data))
        navigate('/');
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  return (
    <Container className="small-container">
      <h1 className="my-3">Signup Page</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword2"
            {...register("Name", { required: true })}
            onChange={(e) => setStates({...states,Name:e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register("email", { required: true })}
            onChange={(e) => setStates({...states,email:e.target.value})}

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
            {...register("password", { required: true })}
            onChange={(e) => setStates({...states,password:e.target.value})}

          />
        </div>
        <button onClick={onSubmit} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Link to="/login">Already signed up? Login here</Link>
    </Container>
  );
};

export default Signup;
