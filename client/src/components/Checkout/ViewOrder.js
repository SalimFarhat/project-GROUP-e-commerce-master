import styled from "styled-components";
import { useContext } from "react";
import Confirmation from "../Pages/Confirmation";
import { CheckoutContext } from "../Context/CheckoutContext";

const ViewOrder = () => {
    const { confirmation } = useContext(CheckoutContext);
    const cart = confirmation.oldCart;
    const failed = [];

    return(
        <Wrapper>
            <Confirmation successful={cart} failed={failed}/>
        </Wrapper>
    )
}

export default ViewOrder;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100vw - 200px);
    min-height: calc(100vh - 110px);
`;