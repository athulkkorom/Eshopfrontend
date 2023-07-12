import { Container } from "react-bootstrap";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const AdminLogin = () => {
    useEffect(()=>{
        const admintoken = localStorage.getItem('admintoken')
          if(admintoken){
              navigate('/admin')
      
          }
      
          })
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit =(data)=>{axios.post(`http://localhost:5000/adminlogin`, data)
  .then(response => {
    console.log('success')
    localStorage.setItem("admintoken",response.data.admintoken)
    navigate('/Admin');
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
      Mobile No
    </label>
    <input
      type="number"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      {...register("MobileNo", { required: true})} 
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Admin Code
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      {...register("AdminCode", { required: true})} 
    />
  </div>
  <button type="submit" className="btn btn-primary">
    Login
  </button>
</form>

        </Container>
    );
}
 
export default AdminLogin;