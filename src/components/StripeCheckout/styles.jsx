import styled from "styled-components";

export const Container = styled.div`
  background: #ffffff;
  border-radius: 5px;
  width: 50%;
  margin: auto;
  margin-top: 80px;
  #card-element {
    box-sizing: border-box;
    height: 40px;
    padding: 10px 12px;
    border: 1px solid #d4d7e1;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    transition: box-shadow 150ms ease;
    &.StripeElement--focus {
      box-shadow: 0 1px 3px 0 #cfd7df;
    }

    &.StripeElement--invalid {
      border-color: #fa755a;
    }

    &.StripeElement--webkit-autofill {
      background-color: #fefde5 !important;
    }
  }
`;

export const Label = styled.label`
  color: #181436;
  font-size: 18px;
  font-family: Roboto Bold;
`;

export const Error = styled.div`
  color: #fa755a;
  font-size: 12px;
`;
