import styled from "styled-components";
import { useState, useContext } from "react";
import Confirmation from "../Pages/Confirmation";
import ViewOrder from "./ViewOrder";
import { CartContext } from "../Context/CartContext";
import { CheckoutContext } from "../Context/CheckoutContext";
import { calculateTotalFromCart } from "../utils";

const Checkout = () => {
    const [successful, setSuccessful] = useState([]);
    const [failed, setFailed] = useState([]);
    const [customerData, setCustomerData] = useState({});
    const { status, setStatus, confirmation, setConfirmation, setLatestConfirmationId} = useContext(CheckoutContext);
    const { cartState: {cart} } = useContext(CartContext);
    // console.log(cart)
    // successPurchase isn't returning the quantity of each item purchased
    // i'm setting the "successful" array equal to the cart for now
    const order = cart;

    const handleSubmit = (e) => {
        e.preventDefault();
        const confirmationId = Math.random() * 100;

        fetch('/api/updateItems', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // setSuccessful(data.successPurchase);
            setSuccessful(cart);
            setFailed(data.failPurchase);
            setStatus(data.status);
            setConfirmation({...confirmation, newConfirmation: true, oldCart: cart});
            setLatestConfirmationId(confirmationId);
            //  set an id in localstorage to retrieve the last order
            window.localStorage.setItem("confirmationId", JSON.stringify(confirmationId));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return(
        <>
        { status !== 200 && 
        <Wrapper>
        <InfoWrapper>
            <CheckOutTitle>Please confirm your purchase</CheckOutTitle>
            <CheckOutPrice>Total: ${calculateTotalFromCart(cart)}</CheckOutPrice>
            <FormWrapper onSubmit={handleSubmit}>
                <input required name="givenName" type="text" placeholder="First Name" onChange={(e) => setCustomerData({...customerData, givenName: e.target.value}) }></input>
                <input required name="surname" type="text" placeholder="Last Name" onChange={(e) => setCustomerData({...customerData, surname: e.target.value}) }></input>
                <input required name="email" type="email" placeholder="Email" onChange={(e) => setCustomerData({...customerData, email: e.target.value}) }></input>
                <Button>Confirm</Button>
            </FormWrapper>
        </InfoWrapper>
        </Wrapper>
        }

        {status === 200 && <Confirmation successful={successful} failed={failed}/>}
        {/* {confirmation.sessionActive && <ViewOrder />} */}

        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 110px);
    width: calc(100vw - 200px);
`;

const InfoWrapper = styled.div`
    align-self: center;
    margin: 100px;
    display: flex;
    flex-direction: column;
`;

const FormWrapper = styled.form`
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 350px;
    background: transparent;
    border: 2px solid var(--primaryColor);
    transition:all ease-out 200ms;
    input {
        margin: 10px;
        border: 1px solid lightgrey;
    }
`;

const Button = styled.button`
    cursor: pointer;
    border: solid 2px;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-top: 10px;
    width: 100px;
    height: 40px;
    color: white;
    background-color: var(--accentColor);
    transition:all ease-out 200ms;

    &:active{
        background-color: var(--primaryColor);
        color: var(--subTextColor);
    }
    &:hover{
        background-color: transparent;
        color: var(--mainCATBackground);
        border-color: var(--mainCATBackground);
    }
`;

const CheckOutTitle = styled.div`
    font-weight: bold;
    font-size: 2em;
    margin-bottom: 40px;
`;

const CheckOutPrice = styled.div`
    text-align: left;
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 10px;
    color: var(--accentColor);
`;

export default Checkout;