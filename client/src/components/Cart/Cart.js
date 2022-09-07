/***
 * @author Frederic Brockow
 *  Component that renders the Cart
 */

import styled from "styled-components";
import { calculateTotalFromCart } from "../utils";
import { useHistory } from "react-router-dom";

import CartElement from "./CartElement";
import { CartContext } from "../Context/CartContext";
import {useContext} from 'react';



const Cart = () => {
    const history = useHistory();
    const { cartState: {cart} } = useContext(CartContext);

    return(

        <Wrapper>
        <Header>Let's review your order before checking out</Header>
            {cart.length > 0 ?
            <CartWrapper>
                <ItemsWrapper>
                    {cart?.length > 0 ?<> {/* not necessary on that context */}
                        {cart.map((purchasedItem) => {
                            return <CartElement purchasedItem = {purchasedItem} key={purchasedItem.item._id}/>
                        })}
                    </>
                    :
                    null
                    }

                </ItemsWrapper>
                <CheckOut>
                    <CheckOutTitle>Your Purchase</CheckOutTitle>
                    <CheckOutPrice>Total: ${calculateTotalFromCart(cart)}</CheckOutPrice>
                    <Button onClick={() => history.push("/checkout")}>Checkout</Button>
                </CheckOut>
            </CartWrapper>
            :
            <Empty> There is nothing in your cart...</Empty>
        }
        </Wrapper>

    )
}

const Wrapper = styled.div`
    min-height: calc(100vh - 110px);
    margin-left: 10%;
    margin-bottom : 150px;
`;

const Empty = styled.div``;

const Header = styled.div`
    font-family: var(--font-body);
    color: var(--mainTextColor);
    padding: 2em 0;
    font-size: 2em;
`;

const CartWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const ItemsWrapper = styled.div`
    width: 750px;

`;

const CheckOut = styled.div`
    margin: 0px 25px;
    color: var(--mainTextColor);
`;

const CheckOutTitle = styled.div`
    font-weight: bold;
    font-size: 2em;
    margin-bottom: 50px;
`;

const CheckOutPrice = styled.div`
    text-align: right;
    font-size: 1.3em;
    font-weight: bold;
`;

const Button = styled.button`
    cursor: pointer;
    width: 100%;
    margin-top: 20px;
    font-size: 1.7em;
    padding: 5px 0;
    background-color: var(--mainCATBackground);

    border-color: transparent;

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


export default Cart;