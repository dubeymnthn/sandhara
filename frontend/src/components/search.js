import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = ({ history }) => {
  const [keyword_orders, setKeyword_orders] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword_orders.trim()) {
      history.push(`/search/${keyword_orders}`);
    } else {
      history.push("/null");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword_orders(e.target.value)}
        placeholder="Search Orders"
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
