import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Login.css";
import { useForm } from "react-hook-form";



const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState();
  const history = useHistory();

  useEffect(()=>{
    if(localStorage.getItem("token")){
      history.push("/contact");
    }
  },[])

  const onSubmit = (data, e) => {
    setMessage({
      data: "Login is in progress...",
      type: "alert-warning",
    }); 
      setTimeout(() => {
        localStorage.setItem("token", 'testToken');
        history.push("/contact");
      }, 3000);
      e.target.reset();
  };

  return (
       <div className={`${styles.container} container-fluid d-flex align-items-center justify-content-center mr50`}>

      <div className={styles.loginFormContainer}>
        {message && (
          <div
            className={`alert fade show d-flex ${message.type}`}
            role="alert"
          >
            {message.data}
            <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>
          </div>
        )}
        <fieldset className="border p-3 rounded">
          <div className="imgcontainer">
            <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="avatar" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="form-group">
              <label htmlFor="inputForEmail">Email address</label>
              <span className="mandatory">*</span>
              <input
                id="inputForEmail"
                // name="email"
                type="email"
                className="form-control"
                aria-describedby="Enter email address"
                placeholder="Enter email address"
                {...register('email1',{
                  value:'foo',
                  required: true ,
                    message: "Please enter your email address",
                  })}
               
              />
              {/**
               * we provide validation configuration for email field above
               * error message are displayed with code below
               */}
              {errors.email && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Password</label>
              <span className="mandatory">*</span>
              <input
                type="password"
           
                className="form-control"
                id="inputForPassword"
                placeholder="Enter password"

                 {...register('password',{
                  value:'bar',
                    required: true,
                    message: "Please enter password",
                  })}

                
              />
              {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-outline-primary login-btn">
                Login
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
   
  );
};

export default Login;