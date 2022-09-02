import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/formContainer";
import CheckoutStep from "../components/CheckoutStep";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Paytm"
              id="Paytm"
              name="paymentMethod"
              value="Paytm"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;

// import React, { useState } from 'react'
// import { Form, Button,Col} from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import FormContainer from '../components/formContainer'
// import CheckoutStep from '../components/CheckoutStep'
// import {savePaymentMethod} from '../actions/cartActions'

// const PaymentScreen = ({history}) => {
//     const cart = useSelector(state=>state.cart)
//     const {shippingAddress} = cart

//     if(!shippingAddress){
//         history.push('shipping')
//     }

//     const [paymentMethod,setPaymentMethod] =useState('PayPal')

//     const dispatch = useDispatch()
//     const submitHandler = (e) =>{
//         e.preventDefault()
//         dispatch(savePaymentMethod(paymentMethod))
//         history.push('/payment')
//     }

//     return (
//         <FormContainer>
//           <CheckoutStep step1 step2/>
//             <h1>Payment Method</h1>
//             <Form onSubmit={submitHandler}>
//                 <Form.Group>
//                     <Form.Label as='legend'>Select Method</Form.Label>
//                     </Form.Group>
//                 <Col>
//                     <Form.Check
//                      type='radio'
//                       label='Paypal or Credit Card'
//                        id='PayPal' name='paymentMethod'
//                         value='Paypal'
//                         checked
//                          OnChange={(e)=>setPaymentMethod(e.target.value)}> </Form.Check>
//                      <Form.Check
//                      type='radio'
//                       label='Paytm'
//                        id='Paytm' name='paymentMethod'
//                         value='Paytm'

//                          OnChange={(e)=>setPaymentMethod(e.target.value)}> </Form.Check>
//                      <Form.Check
//                      type='radio'
//                       label='GPay'
//                        id='GPay' name='paymentMethod'
//                         value='GPay'
//                         checked
//                          OnChange={(e)=>setPaymentMethod(e.target.value)}> </Form.Check>
//                 </Col>

//             <Button type='submit' variant='primary'>
//                 Continue
//             </Button>
//             </Form>
//         </FormContainer>
//     )
// }

// export default PaymentScreen
