/**
 * @author Salim & Frederic Brockow
 * Component that renders a single Items
 * @Functionality 
 *      can add 1 item (default)
 *      can add more than one (selection)
 *      drop down quantity updates with the stock remaing accord to 
 *          the quantity of that item  already in the cart
 *      Add button disabled once all of the stock remaining for that item is in the Cart
 * 
 *      Displays "OUT OF STOCK" instead of the add to cart button , when numInStock = 0
 * 
 * */

import styled from "styled-components";
import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { CartContext } from "../Context/CartContext";
import { getItemQuantityAvailable } from "./singleItemHelper";
import QuantitySelector from "./QuantitySelector";

const SingleItem = ({props}) => {
    const history = useHistory();
    const {item} = useParams();
    
    const default_quantity = 1;

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedQuantity,setSelectedQuantity] = useState(default_quantity);
    const [quantityAvailable, setQuantityAvailable] = useState({inCart:0, available:0})

    const[refresh, setRefresh]= useState(false);

    const {cartState, cartDispatch} = useContext(CartContext);


    /**
    * @author Frederic Brockow
    *   handler the quantity selected of that item 
    *   to be added to the cart
    **/
    const handleSelectQuantity = (event) => {
        const newQuantity = (parseInt(event.target.value));
        setSelectedQuantity(newQuantity);
    }
    

    /**
    * @author Frederic Brockow
    *   handler addign the item tto the cart 
    *   redirects to homepage once done
    **/
    const handleClickAddToCart = () => {
        cartDispatch(
            {
                type: "add-to-cart",
                data: {item: selectedItem, quantity: selectedQuantity}
            })
            setRefresh(!refresh);
            history.push("/");
    }

    /**
    * @author Frederic Brockow
    * need to trigger a refesh to update that value
    * or the increment will not behave properly
    **/
    useEffect(() => {
        setSelectedQuantity (default_quantity);
    }, [refresh])


    useEffect(() =>{
        fetch(`/api/getItem/${item}`)
        .then(res => {return res.json()})
        .then((data) => {
            setSelectedItem(data.data);
            return(fetch(`/api/getCompany/?companyId=${data.data.companyId}`))})
            .then(res2 => {return res2.json()})
            .then(data2 => {
                setSelectedCompany(data2.data)
            })
        .catch(err => console.log(err))
    }, []);


    /**
    * @author Frederic Brockow
    * updates the inCart and Available value
    **/
    useEffect(() => {
        if(selectedItem ){
            if (cartState.cart.length !== 0) {
                const qtyObj = getItemQuantityAvailable(cartState.cart, selectedItem);
                setQuantityAvailable(qtyObj);
            }
            else {
                setQuantityAvailable( {inCart: 0, available: selectedItem.numInStock});
            }
        } 
    }, [selectedItem]);
    
    return(
        <>
        { selectedItem && selectedCompany && (
        <Wrapper>
            
            <ItemInfoWrapper>
            <ItemImage src={selectedItem.imageSrc}></ItemImage>
            <NameAndQuantity>
                <ItemName>
                   {selectedItem.name}
                </ItemName>
                <BodyAndCat>
                    part:{selectedItem.body_location} - category:{selectedItem.category}
                </BodyAndCat>
                <ItemPrice>
                   {selectedItem.price} per unit
                </ItemPrice>
                <ItemStock>
                   {selectedItem.numInStock === 0 ? "Out of stock" : `We have ${selectedItem.numInStock} in stock`}
                </ItemStock>
                <MadeIn>
                    Made by {selectedCompany.name}
                </MadeIn>
                </NameAndQuantity>
            </ItemInfoWrapper>
            {quantityAvailable.inCart > 0 ? 
                <CartInfo> You currently have {quantityAvailable.inCart} in your cart</CartInfo>

                :
                null
                }
            <AddToCartWrapper>
                
                { selectedItem.numInStock !== 0 ? 
                <>
                    <BuyButton 
                    disabled = {!quantityAvailable.available}
                    className = {!quantityAvailable.available&&"disabled"}
                    onClick={handleClickAddToCart} >
                            Add to cart
                    </BuyButton> 
                    {quantityAvailable.available > 0 ?
                    <QuantitySelector 
                        selectedQuantity={selectedQuantity}
                        handleSelectChange = {handleSelectQuantity}
                        quantityAvailable = {quantityAvailable.available} 
                        id = {selectedItem._id}/>
                    : null
                    }
                </>
                    : 
                    <OutOfStock>Out Of Stock</OutOfStock>
                }
            </AddToCartWrapper>
        </Wrapper>
        )}
    </>
    )
}

export default SingleItem;

const NameAndQuantity = styled.div`

display: flex;
    flex-direction: column;
    /* justify-content: center; */
    flex-wrap: wrap;

`

const BuyButton = styled.button`
    background-color:#44c767;
    border-radius:9px;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-family:Arial;
    font-size:17px;
    padding:16px 31px;
    text-decoration:none;
    text-shadow:0px 1px 0px #2f6627;
    margin-right: 25px;
    
    &:hover{
	background-color:#5cbf2a;

    }
    &:active{
	position:relative;
	top:1px;
    }

    &.disabled{
        cursor: default;
        background-color: var(--subTextColor);
        color: var(--mainTextColor);
        opacity: 0.3;

        &:active {
            position:relative;
	        top:0px;
        }
    }
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    /* flex-wrap: nowrap; */
    /* justify-content: space-evenly; */
    /* align-items: center; */
    /* align-content: stretch; */
`
const ItemInfoWrapper = styled.div`
    display: flex;
    /* flex-direction: row; */
    /* position: relative; */
    /* left: 20%; */
    /* justify-content: space-evenly; */
    background-color: rgb(250, 251, 253);
    margin-top: 200px;
    margin-left: 30%;
    padding-left: 30px;
    padding-right: 75px;
`

const AddToCartWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 25px;
    margin-left: 30%;
`;

const ItemImage = styled.img`
width: 130px;
height: 130px;
margin-bottom: 10px;
margin-top: 10px;

`
const MadeIn = styled.p`
margin-left: 20px;
padding-bottom: 10px;

`
const ItemName = styled.p`
margin-top: 15px;
margin-left: 20px;
/* position: relative;
top: 30%;
left: 5%; */
/* border-bottom: 1px solid black; */
color: var(--mainTextColor);

font-weight: bold;

`
const ItemPrice = styled.p`
    margin-left: 20px;
    margin-top: 5px;
    font-weight: bold;

`

const ItemStock = styled.p`
margin-top: 10px;
margin-bottom: 10px;
margin-left: 20px;
/* border-top: 1px solid black; */
/* position: relative; */

/* padding-bottom: 10px; */
/* border-bottom: 1px solid black; */
color: var(--mainTextColor);
font-size: 1em;

`
const OutOfStock = styled.span`
    text-transform: uppercase;
`;

const CartInfo = styled.div`
/* margin-right: 50px; */
margin-left: 50%;
margin-top: 5%;
`;


const BodyAndCat = styled.div`
    margin-top: 5px;
    margin-left: 20px;
    font-style: italic;
    font-size: 0.7em;
    color: var(--subTextColor);

`;






// <ItemImage src={selectedItem.imageSrc}></ItemImage>
// <ItemInfoWrapper>
//     <ItemName>
//        {selectedItem.name}
//     </ItemName>
//     <ItemPrice>
//        {selectedItem.price}
//     </ItemPrice>
//     <ItemStock>
//        {selectedItem.numInStock === 0 ? "Out of stock" : `We have ${selectedItem.numInStock} in stock`}
//     </ItemStock>
//     <MadeIn>
//         Made by {selectedCompany.name}
//     </MadeIn>

// </ItemInfoWrapper>
// <AddToCartWrapper>
//     {quantityAvailable.inCart > 0 ? 
//     <CartInfo> you already have {}{quantityAvailable.inCart} in your cart</CartInfo>
//     :
//     null
//     }
//     { selectedItem.numInStock !== 0 ? 
//     <>
//         <BuyButton 
//         disabled = {!quantityAvailable.available}
//         className = {!quantityAvailable.available&&"disabled"}
//         onClick={handleClickAddToCart} >
//                 Add to cart
//         </BuyButton> 
//         {quantityAvailable.available > 0 ?
//         <QuantitySelector 
//             selectedQuantity={selectedQuantity}
//             handleSelectChange = {handleSelectQuantity}
//             quantityAvailable = {quantityAvailable.available} 
//             id = {selectedItem._id}/>
//         : null
//         }
//     </>
//         : 
//         <OutOfStock>Out Of Stock</OutOfStock>
//     }
// </AddToCartWrapper>