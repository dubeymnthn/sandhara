import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, UpdateUser } from "../actions/userAction";
import FormContainer from "../components/formContainer";
import { USER_UPDATE_RESET } from "../constant/userConstant";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isadmin, setisadmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setisadmin(user.isadmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UpdateUser({ _id: userId, name, email, isadmin }));
  };

  return (
    <div>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Details of {user.name}</h1>
        {loadingUpdate && <h1>Loading...</h1>}
        {errorUpdate && <h2>{errorUpdate}</h2>}
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

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Adminstrator"
                checked={isadmin}
                onChange={(e) => setisadmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen;
