import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Listorders } from "../actions/orderActions";
import SearchBar from "../components/search";

const OrderListScreen = ({ history, match }) => {
  const keyword_orders = match.params.keyword_orders;
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isadmin) {
      dispatch(Listorders(keyword_orders));
    } else {
      history.push("/signin");
    }
  }, [dispatch, userInfo, history, keyword_orders]);

  return (
    <div>
      <h1>Orders</h1>
      <p>Search products From Dates or from Order Id </p>
      <form action="https://example.com">
        <label>
          Enter the Date :
          <input type="date" name="bday" />
        </label>
        <p>
          <button>Submit</button>
        </p>
      </form>
      <Route render={({ history }) => <SearchBar history={history} />} />

      <h2>Latest Orders</h2>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>

              <th>Get the Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>Rs {order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <>Delivered</>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default OrderListScreen;
