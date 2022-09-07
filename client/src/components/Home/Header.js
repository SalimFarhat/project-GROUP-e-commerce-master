import styled from "styled-components";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../Context/CartContext";
import { FilteringContext } from "../Context/FilteringContext";

const Header = () => {
    const { cartState: {cart} } = useContext(CartContext);   
    const { setFilters, setSelectedCategory, setSelectedPart } = useContext(FilteringContext); 
    let numOfItems = cart.length;

    useEffect(() => {
        numOfItems = cart.length;
    }, [cart])

    const handleClick = () => {
        setFilters(null);
        setSelectedCategory("");
        setSelectedPart("");
    }


    return(
        <Wrapper>
            <Logo to="/" onClick={handleClick}>WearTech</Logo>
            <Link to="/cart">
                <Cart />
            </Link>
            {numOfItems > 0 && 
            <Counter>{numOfItems}</Counter>
            }
        </Wrapper>
    )
}

const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--primaryColor);
    height: 110px;
    padding: 10px;
`;

const Logo = styled(Link)`
    justify-self: center;
    color: white;
    font-family: var(--font-heading);
    text-decoration: none;
    font-size: 2.5em;
    margin: 10px;
`;

const Cart = styled(FiShoppingCart)`
    color: white;
    font-size: 2em;
    margin: 10px;
`;

const Counter = styled.div`
    text-align: center;
    line-height: 20px;
    position: absolute;
    right: 10px;
    top: 30px;
    color: white;
    background: var(--accentColor);
    height: 20px;
    width: 20px;
    border: none;
    border-radius: 50%;
`;

export default Header;