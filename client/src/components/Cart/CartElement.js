/***
 * @author Frederic Brockow
 *  Component that renders a card for a single item in the Cart 
 */

import styled from "styled-components"
import { priceParser } from "../utils";
import { CartContext } from "../Context/CartContext";
import {useContext, useState} from 'react';

import QuantitySelector from "./QuantitySelector";


const CartElement = ({purchasedItem}) => {

    const {item, quantity} = purchasedItem;
    const {cartDispatch} = useContext(CartContext);
    const [selectedQuantity,setSelectedQuantity] = useState(quantity);

    
    /*  Handles the change in the quantity of a same item being purchased
    *   updates the cart on change
    */
    function handleSelectChange(event) {
        const newQuantity = (parseInt(event.target.value));

        setSelectedQuantity(newQuantity);
        cartDispatch({
            type: "change-item-quantity",
            data: {item : item, quantity: newQuantity}
        });
    }

    return (
        <Wrapper>
           <ItemWrapper>
                <Img alt = "" src={item.imageSrc}/>
                <ItemDescription>
                    <ItemName>{item.name}</ItemName>
                    <SubWrapper>
                        <ItemCategory><span>category:</span>{item.category}</ItemCategory>
                        <ItemPart><span>part:</span>{item.body_location}</ItemPart>
                    </SubWrapper>
                </ItemDescription>
                <Price>${priceParser(item.price)}</Price>
           </ItemWrapper>
           <CheckOut>
               <Button onClick = {() => {
                   cartDispatch(
                            {
                                type: "remove-from-cart",
                                data: {item :purchasedItem.item, quantity: purchasedItem.quantity}
                            })
                    }                        
               }
                >
                    remove
                </Button>
               <Quantity>
                   <span>Qty:</span>
                   <QuantitySelector 
                        selectedQuantity={selectedQuantity} 
                        quantityAvailable={item.numInStock}
                        handleSelectChange={handleSelectChange}
                        id = {item._id*item.companyId} 
                        />
                </Quantity>
               <Total><span>Total:</span>${(selectedQuantity*priceParser(item.price)).toFixed(2)}</Total>
           </CheckOut>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: var(--itemBackground); 
    padding: 20px 80px ;
    color: var(--mainTextColor);
    border: 1px solid var(--veryLightGreyBorder);
    border-right: 3px solid var(--borderColor);

`;

const ItemWrapper = styled.div`
    display: flex;
    padding: 35px 0;
   
`;

const ItemDescription = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    flex-grow: 2;
`;

const SubWrapper = styled.div`
    display: flex;
    margin-top:5px;
    color: var(--subTextColor);
`;

const CheckOut = styled.div`
    display:flex;
    justify-content: flex-end;
    align-items: baseline;

    border-top: 1px solid var(--subTextColor);
    padding-top: 15px;

    & span {
        margin-right: 5px;
    }
`;

const Img = styled.img`
    height: 4em;
`;

const ItemName = styled.div`
    font-weight: bold;
    font-family: var(--font-body);
`;

const ItemCategory =  styled.div`
    font-style: italic;
    margin-right: 0.7em;
`;

const ItemPart = styled(ItemCategory)``;

const Price = styled.div`
    margin-left:25px;
    color: var(--accentColor);
`;

const Quantity = styled.div`
    margin-left:25px;
    font-size: 0.9em;
    color: var(--subTextColor);
`;

const Total = styled.div`
    color:var(--accentColor);
    font-size: 1.2em;
    font-weight: bold;
    margin-left: 10px;
`;

const Button = styled.button`
    cursor: pointer;
    border : none;
    color: var(--subTextColor);
    font-size: 0.6em;
`;

export default CartElement;