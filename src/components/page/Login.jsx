import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd'; // Ensure you have installed antd for message component
import Cookies from 'js-cookie'; // Ensure you have installed js-cookie for handling cookies
import logo from '../../assets/logoAdmin.png';
import { Link } from 'react-router-dom';
// import Link from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      const { token, user } = response.data.result;
      const tokenData = {token, userId: user.id, role: user.role};
      Cookies.set("token",  JSON.stringify(tokenData), { expires: 7 });
      console.log(response.data.result)
      if (user.role === "admin") {
        message.success('WELCOME ADMIN');
        window.location.href = '/sidebar'; // Redirect to admin dashboard
      } else {
        message.error('You do not have the necessary permissions to access this area.');
      }
    } catch (error) {
      if (error.response) {
        message.error('Error login');
      } else if (error.request) {
        message.error('Error: Unable to connect to the server');
      } else {
        message.error('An unknown error occurred');
      }
    }
  };
  return (
    <div className=" d-flex justify-content-center fs-4" style={{marginLeft: "120px"}}>
      <form onSubmit={handleLoginFormSubmit} className="border rounded p-4 mb-5" style={{backgroundColor:"white", marginTop: "100px"}}>
        <div className="d-flex justify-content-center">
          <img src={logo} alt="Logo" />

        </div>
        <div className="row g-3 align-items-center mt-2">
          <div className="col-auto" >
            <label htmlFor="inputEmail" className="col-form-label">
              <i className="fa fa-envelope-o" aria-hidden="true" ></i>
            </label>
          </div>
          <div className="col-auto">
            <input
              type="email"
              id="inputEmail"
              placeholder="Enter Email"
              className="form-control border-bottom border-dark"
              name="email"
              required
              value={email}
              onChange={handleEmailChange}
              style={{ width: "400px", border: "none" }}
            />
          </div>
        </div>
        <br />
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="inputPassword2" className="col-form-label">
              <i className="fa fa-lock" aria-hidden="true"></i>
            </label>
          </div>
          <div className="col-auto">
            <input
              type="password"
              id="inputPassword2"
              placeholder="Enter password"
              className="form-control border-bottom border-dark"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              style={{ width: "400px", border: "none" }}
            />
          </div>
        </div>
        <p className="mt-3 text-center small">Do not have an account? <Link to="/register" className="text-danger">
            Sign up
          </Link> 
          
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="mt-3 btn btn-dark w-50 custom-button" style={{ backgroundColor: '#7C6A46', height: '45px' }}>
            Sign in
          </button>
        </div>
        <h5 className="text-center mt-3" style={{ color: '#7C6A46' }}>OR</h5>
        <div className="d-flex justify-content-center">
          <button type="button" className="mt-3 btn btn-dark w-75 text-black mb-2" style={{ backgroundColor: 'white' }}>

            <img
              src="src/assets/logo_1.jpg"
              alt="Google Logo"
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
            />
            Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
