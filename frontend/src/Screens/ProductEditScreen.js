import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/formContainer";
import { PRODUCT_UPDATE_RESET } from "../constant/productConstant";
import Message from "../components/Message";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setname] = useState(" ");
  const [price, setprice] = useState(0);
  const [image, setimage] = useState("");
  const [Category, setCategory] = useState("");
  const [Quality, setQuality] = useState("");
  const [Description, setDescription] = useState("");
  const [numReviews, setnumReviews] = useState("");
  const [countInStock, setcountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setname(product.name);
        setprice(product.price);
        setimage(product.image);

        setCategory(product.Category);
        setQuality(product.Quality);
        setDescription(product.Description);
        setnumReviews(product.numReviews);
        setcountInStock(product.countInStock);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setimage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        Category,
        Description,
        countInStock,
        numReviews,
        Quality,
      })
    );
  };

  return (
    <div>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <h1>Loading...</h1>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <h1>Loading....</h1>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="Name">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="Name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="price"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setprice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Image">
              <Form.Label>Enter image</Form.Label>
              <Form.Control
                type="image"
                placeholder="Enter image Url"
                value={image}
                onChange={(e) => setimage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File "
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <h1>Loading.....</h1>}
            </Form.Group>
            <Form.Group controlId="Category">
              <Form.Label>Enter Category</Form.Label>
              <Form.Control
                type="Category"
                placeholder="Enter Category"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="Quality">
              <Form.Label>Enter Quality</Form.Label>
              <Form.Control
                type="Quality"
                placeholder="Enter Quality"
                value={Quality}
                onChange={(e) => setQuality(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Description">
              <Form.Label>Enter Description</Form.Label>
              <Form.Control
                type="Description"
                placeholder="Enter Description"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="numReviews">
              <Form.Label>Enter numReviews</Form.Label>
              <Form.Control
                type="numReviews"
                placeholder="Enter numReviews"
                value={numReviews}
                onChange={(e) => setnumReviews(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Enter countInStock</Form.Label>
              <Form.Control
                type="countInStock"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setcountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
