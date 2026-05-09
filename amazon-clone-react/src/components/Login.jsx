import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AmazonLogo from "../assets/amazon-logo-large.png";

import "./Login.css";

import Modal from "./Modal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formIsValid, setIsFormIsValid] = useState(false);

  useEffect(() => {
    setIsFormIsValid(email.includes("@") && password.trim().length > 6);
  }, [email, password]);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const signIn = (e) => {
    e.preventDefault();
    console.log(formIsValid);
    // using refs with input to interact with the dom is called uncontrolled component
    // why uncontrolled? becuase the input field is handled in the dom itself and the state is not managed by react
    // using value={} and onChange={} with managing the state - would be a controlled components
  };

  return (
    <div className="login">
      <Link to="/home">
        <img src={AmazonLogo} alt="Amazon Logo" className="login-logo" />
      </Link>

      <div className="login-container">
        <h1>Sign in</h1>
        <form>
          <h5>Email</h5>
          <input type="email" value={email} onChange={emailChangeHandler} />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={passwordChangeHandler}
          />
          <button type="submit" className="login-signInButton" onClick={signIn}>
            Sign in
          </button>
        </form>
        <p>
          By signing in, you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our totally legit Privacy Notice, our Chocolate Chip
          Cookies and our UnInteresting-Based Ads Notice.
        </p>
        <button className="login-registerButton">
          Create your Amazon account
        </button>
      </div>
    </div>
  );
};

export default Login;

// Here is how we would access the Portal Modal
// import ReactDom from "react-dom";
// const [isOpen, setIsOpen] = useState(false);
// <button onClick={() => setIsOpen(true)}>Open Modal</button>
// {isOpen &&
//   ReactDom.createPortal(
//     <Modal setIsOpen={setIsOpen} />,
//     document.getElementById("modal-root-div"),
//   )}
