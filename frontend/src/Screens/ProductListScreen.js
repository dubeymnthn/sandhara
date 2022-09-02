import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
  listProducts,
  DeleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constant/productConstant";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, product, pages, page } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: SuccessDelete,
  } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: SuccessCreate,
    product: createdProduct,
  } = productCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(DeleteProduct(id));
    }
  };

  const createProducthandler = () => {
    dispatch(createProduct());
  };
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isadmin) {
      history.push("/signin");
    }
    if (SuccessCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    history,
    SuccessDelete,
    createdProduct,
    SuccessCreate,
  ]);

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products </h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProducthandler}>
            <i className="fas fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <h1>Loading...</h1>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <h1>Loading...</h1>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>QUALITY</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.Category}</td>
                  <td>{product.Quality}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page}></Paginate>
        </>
      )}
    </div>
  );
};
export default ProductListScreen;
