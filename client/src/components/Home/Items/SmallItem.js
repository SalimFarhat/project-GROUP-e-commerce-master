import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

const SmallItem = ({ item }) => {
    const { cartDispatch } = useContext(CartContext);

    return(
        <Wrapper>
            <ItemWrapper to={`/item/${item._id}`}>
                <ImageWrapper>
                    <img src={item.imageSrc} alt={item.name}/>
                </ImageWrapper>
                <TextWrapper>
                    <Product>{item.name}</Product>
                    <Category>category: {item.category}</Category>
                    <p>Stock left: {item.numInStock}</p>
                </TextWrapper>
                <span>{item.price}</span>
            </ItemWrapper>
            {item.numInStock !== 0 ? 
                <BuyButton onClick={()=>
                        cartDispatch(
                        {
                            type: "add-to-cart",
                            data: {item: item, quantity: 1}
                        })
                }>add to cart</BuyButton>
                :
                <NoStock>OUT OF STOCK</NoStock>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    font-family: var(--font-body);
    width: 300px;
    height: 350px;
    margin: 10px;
    padding: 40px 40px 40px 40px;
`;

const ItemWrapper = styled(Link)`
    height: 300px;
    text-decoration: none;
    font-family: var(--font-body);
    color: var(--mainTextColor);
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 120px;
    width: 300px;
    margin-bottom: 10px;
`;

const ImageWrapper = styled.div`
    display: flex;
    height: 120px;
    width: 300px;

    img {
        /* padding: 10px; */
        width: 100px;
        height: 100px;
    }
`;

const BuyButton = styled.button`
    cursor: pointer;
    border: solid 2px;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-left: 10px;
    width: 80px;
    height: 30px;
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

const Product = styled.p`
    font-size: 1.1em;
    font-weight: 600;
    color: var(--mainTextColor);
    margin-bottom: 5px;
`;

const Category = styled.p`
    font-style: italic;
    color: var(--subTextColor);
    margin-bottom: 5px;
`;

const NoStock = styled.p`
    color: var(--errorColor);
    font-size: 14px;
    font-weight: 500;
`

export default SmallItem;