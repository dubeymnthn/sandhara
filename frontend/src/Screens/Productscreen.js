import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";

import {
  listProductDetails,
  ProductcreateReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constant/productConstant";

const Productscreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment(" ");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      ProductcreateReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <h1>Loading....</h1>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>{product.name}</h2>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <h2>₹{product.price} per kg </h2>
                </ListGroupItem>
                <ListGroupItem>
                  <p>{product.Description}</p>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty(In kg)</Col>
                        <Col>
                          <input
                            type="number"
                            step="0.25"
                            min="0"
                            max="20"
                            className="Form-Control"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroupItem>
                    {product.countInStock === 0 ? (
                      <Message>Sorry Out Of Stock!</Message>
                    ) : (
                      <Button
                        onClick={addToCartHandler}
                        className="btn btn-block"
                        type="button"
                        disabled={qty === 0}
                      >
                        Add To Cart
                      </Button>
                    )}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.review.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.review.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>WRITE A CUSTOMER REVIEW</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <>
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select....</option>
                            <option value="1">1-Poor</option>
                            <option value="2">2-Fair</option>
                            <option value="3">3-Good</option>
                            <option value="4">4-Very Good</option>
                            <option value="5">5-Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    </>
                  ) : (
                    <Message>Please Login to write a Customer Review</Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Productscreen;
