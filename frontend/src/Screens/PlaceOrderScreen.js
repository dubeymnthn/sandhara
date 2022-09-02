import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutStep from "../components/CheckoutStep";
import { removeFromCart } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constant/orderConstant";
import { USER_DETAILS_RESET } from "../constant/userConstant";
const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const cart = useSelector((state) => state.cart);
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, items) => acc + items.price * items.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 500 ? 0 : 100;
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, success]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const placeorderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <div>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.City},
                {cart.shippingAddress.PostalCode},{cart.shippingAddress.Country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method </h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is Empty </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((items, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={items.image}
                            alt={items.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${items.product}`}>
                            {items.name}
                          </Link>
                        </Col>
                        <Col md={2}>
                          {items.qty} x Rs{items.price} = Rs
                          {items.qty * items.price}
                        </Col>
                        <Col md={2}>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(items.product)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total price</Col>
                  <Col>Rs{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="submit"
                  variant="primary"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeorderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
