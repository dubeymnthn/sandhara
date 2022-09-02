import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import FormContainer from "../components/formContainer";

const RegisterScreen = ({ location, history }) => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [message, setmessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "";

  useEffect(() => {
    if (userInfo) {
      history.push(`/${redirect}`);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setmessage = "Password Do Not Match";
    } else {
      dispatch(register(Name, email, password));
    }
  };

  return (
    <div>
      {loading ? (
        <h1>Loading....</h1>
      ) : error ? (
        <h3>{error}</h3>
      ) : message ? (
        <h3>{message}</h3>
      ) : (
        <FormContainer>
          <h1>Sign Up</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="Name">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="Name"
                placeholder="Enter Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmpassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter confirm password"
                value={confirmpassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              REGISTER
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              Have an Account{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/signin"}
              >
                Login
              </Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </div>
  );
};

export default RegisterScreen;
