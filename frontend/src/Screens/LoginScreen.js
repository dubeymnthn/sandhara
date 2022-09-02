import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";

import FormContainer from "../components/formContainer";
import { login } from "../actions/userAction";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "";

  useEffect(() => {
    if (userInfo) {
      history.push(`/${redirect}`);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      {loading ? (
        <h1>Loading....</h1>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <h1>Sign In</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                required="true"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required="true"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </div>
  );
};

export default LoginScreen;

// import React,{useState,useEffect} from 'react'
// import {Link } from 'react-router-dom'
// import {Form,Button,Row,Col} from 'react-bootstrap'
// import {useDispatch, useSelector} from 'react-redux'
// import {login} from '../actions/userAction'
// import FormContainer from '../components/formContainer'
// export const LoginScreen = ({location,history}) => {
//     const [email,setEmail] = useState('')
//     const [password,setPassword] =useState('')
//     const dispatch=useDispatch()
//     const userLogin = useSelector(state=>state.userLogin)
//     const {loading,error,userInfo}= userLogin
//     const redirect=location.search?location.search.spilt('=')[1]:'/'
//     useEffect(()=>{
//         if(userInfo){
//             history.push(redirect)
//         }
//     },[history,userInfo,redirect])
//     const submitHandler=(e)=>{
//         e.preventDefault()
//         dispatch(login(email,password))
//     }
//     return (
//         <FormContainer>
//             Sign In

//         <Form onSubmit={submitHandler}>
//             <Form.Group controlId='email'>
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control type='email' placeholder='Email Address' value={email} onChange={(e) =>setEmail(e.targt.value)}
//                 ></Form.Control>
//             </Form.Group>
//         </Form>

//         <Form onSubmit={submitHandler}>
//             <Form.Group controlId='email'>
//                 <Form.Label>Enter Password</Form.Label>
//                 <Form.Control type='password' placeholder='password ' value={password} onChange={(e) =>setPassword(e.targt.value)}
//                 ></Form.Control>
//             </Form.Group>
//             <Button type='submit' variant='primary'> Sign In </Button>
//         </Form>
//         <Row className='py-3'>
//             <Col>
//             New Customer?<Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
//             </Col>
//         </Row>
//         </FormContainer>
//     )
// }

// export default LoginScreen
