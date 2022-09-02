import React, { useState, useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constant/orderConstant";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import {
  getOrderDetails,
  payOrder,
  DeliverOrder,
} from "../actions/orderActions";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const [sdkReady, SetSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, items) => acc + items.price * items.qty,
      0
    );
  }
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        SetSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        SetSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver]);

  const deliverhandler = () => {
    dispatch(DeliverOrder(order));
  };

  return loading ? (
    <div>Loading....</div>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h2>Order Id {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name :{order.user.name}</strong>{" "}
              </p>
              <p>
                <a href={`mailto:${order.user.email}`}>
                  Email : {order.user.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.City},
                {order.shippingAddress.PostalCode},
                {order.shippingAddress.Country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredat}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method </h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is Empty </Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((items, index) => (
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
                  <Col>Rs{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total price</Col>
                  <Col>Rs{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}{" "}
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <h1>Loading....</h1>}
                  {!sdkReady ? (
                    <h1>Loading....</h1>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <h1>Loading....</h1>}
              {userInfo.isadmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverhandler}
                  >
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
