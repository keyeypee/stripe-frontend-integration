import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Container, Label, Error } from "./styles";

const stripePromise = loadStripe("pk_test_MKf79LKoGDTPoDyPKUGEOT7o00P9oxhiHW");

// const stripeTokenHandler = async (token) => {
//   const response = await fetch("http://localhost:3001/v1/customer/signup_", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ token: token.id, email: 'keyeypee@gmail.com' }),
//   });

//   return response.json();
// };

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = ({ isMobile }) => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      setError(result.error.message);
    } else {
      setError(null);
      setToken(result.token.id);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {!isMobile && <Label for="card-element">Enter Card Detail</Label>}
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
          shippingAddress
        />
        <Error className="card-errors" role="alert">
          {error}
        </Error>
        <button type="submit">Submit</button>
      </form>
      <br />
      Token -->>   {token}
    </Container>
  );
};

const StripeCheckout = ({ isMobile }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm isMobile={isMobile} />
  </Elements>
);

export default StripeCheckout;
