import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/formContainer";
import CheckoutStep from "../components/CheckoutStep";
import { saveShippingAddress } from "../actions/cartActions";
import Message from "../components/Message";
const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [City, setCity] = useState(shippingAddress.City);
  const [PostalCode, setPostalCode] = useState(shippingAddress.PostalCode);
  const [Country, setCountry] = useState(shippingAddress.Country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, City, PostalCode, Country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutStep step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Enter Your Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="City">
          <Form.Label>Enter Your City ,State </Form.Label>
          <Form.Control
            type="text"
            placeholder="For ex:Lucknow,Uttar Pradesh"
            value={City}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="PostalCode">
          <Form.Label>Enter Your PostalCode</Form.Label>
          <Form.Control
            type="PostalCode"
            placeholder="Enter PostalCode"
            value={PostalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="Country">
          <Form.Label>Enter Your Country</Form.Label>
          <Form.Control
            type="Country"
            placeholder="Enter Country"
            value={Country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
