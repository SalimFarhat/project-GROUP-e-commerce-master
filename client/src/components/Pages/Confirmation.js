import styled from "styled-components";
import { priceParser, calculateTotalFromCart } from "../utils";

const Confirmation = ({ successful, failed }) => {

    const fakePurchasedItem = {
        item:   {
            "name": "Jawbone - Up Wristband (large) - Red",
            "price": "$51.99",
            "body_location": "Wrist",
            "category": "Lifestyle",
            "_id": 6561,
            "imageSrc": "data:image/jpeg;base64,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",
            "numInStock": 3,
            "companyId": 18834
          },
        quantity: 2
    }
    const fakePurchasedItem2 = {
        item:     {
            "name": "Bowflex EZ Pro Heart Rate Monitor Watch w/ Quick Touch Technology ...",
            "price": "$12.99",
            "body_location": "Wrist",
            "category": "Fitness",
            "_id": 6620,
            "imageSrc": "data:image/jpeg;base64,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",
            "numInStock": 6,
            "companyId": 11385
          },
        quantity: 2
    }

//     if(failed.length < 1){
//     failed.push(fakePurchasedItem, fakePurchasedItem2);
// }
    // failed.pop();
    console.log(successful);
    console.log(failed);
    const totalPrice = calculateTotalFromCart(successful);
    // console.log(totalPrice);
    // console.log("TOTAL CART", calculateTotalFromCart(successful));
    // <h1></h1>


// 
    if(failed.length >= 1){
        return <>   
        <OuterWrapper>
        <FailureHeader>
    <FailureMessage>
    The purchase attempt has failed. The following items are in conflict with one another.
    </FailureMessage>
    </FailureHeader>
        {successful.map((e) => {
            return(
                <>
            <ItemInfoWrapper2>
            <ProductImage src={e.item.imageSrc}/>
            <NameAndQuantity>
            <ProductName>
            {e.item.name}
            </ProductName>
            <BodyAndCat>part: {e.item.body_location} - category: {e.item.category}</BodyAndCat>
            
            <AmountofItem>
                No. Purchased: {e.quantity}
            </AmountofItem>
            </NameAndQuantity>
            {/* <ItemPrice>
                Price per unit: {e.item.price}
            </ItemPrice> */}
            </ItemInfoWrapper2>
            </>)})}
            
        
    <TotalPriceWrapper>
            <TotalPrice>
            Total Price: <Span3>${totalPrice}</Span3>
            </TotalPrice>
            
    </TotalPriceWrapper>
    



    {failed.map((e) => {
            return(
                <>
            <ItemInfoWrapper2>
            <ProductImage src={e.item.imageSrc}/>
            <NameAndQuantity>
            <ProductName>
            {e.item.name}
            </ProductName>
            <BodyAndCat>part: {e.item.body_location} - category: {e.item.category}</BodyAndCat>
            
            <AmountofItem>
                No. Purchased: {e.quantity}
            </AmountofItem>
            </NameAndQuantity>
            {/* <ItemPrice>
                Price per unit: {e.item.price}
            </ItemPrice> */}
            </ItemInfoWrapper2>
            </>
            )})}
    
    </OuterWrapper>  
 
        </>
    }
    return(
        <>
        
  
            
            <OuterWrapper>
                
            <ThanksMessage>
            <Span1>Thank you for your purchase!</Span1>
            <Span>Here is your confirmation</Span>
            </ThanksMessage>
            {successful.map((e) => {
                return(
                    <>
                <ItemInfoWrapper>
                <ProductImage src={e.item.imageSrc}/>
                <NameAndQuantity>
                <ProductName>
                {e.item.name}
                </ProductName>
                <BodyAndCat>part: {e.item.body_location} - category: {e.item.category}</BodyAndCat>
                
                <AmountofItem>
                    No. Purchased: {e.quantity}
                </AmountofItem>
                </NameAndQuantity>
                {/* <ItemPrice>
                    Price per unit: {e.item.price}
                </ItemPrice> */}
                </ItemInfoWrapper>
                </>)})}
            
        <TotalPriceWrapper>
                <TotalPrice>
                Total Price: <Span3>${totalPrice}</Span3>
                </TotalPrice>
                
        </TotalPriceWrapper>
        </OuterWrapper>          
        
            
        </>
    )
}

export default Confirmation;

// - {e.item.body_location} - {e.item.category}

const FailureOuterWrapper = styled.div`
    display: flex;

`

const FailureHeader = styled.div`
    display: flex;
    margin-left: 340px;
    margin-top: 40px;
    font-size: 2em;

`
const FailureMessage = styled.h1`

`


const Span3 = styled.p`
font-weight: bolder;
`

const Span = styled.p`
    /* margin-left: 20px; */
    /* font-weight: bold; */
    font-size: 0.9em;
    /* margin-top: 20px; */
`
const Span1 = styled.p`
font-weight: bold;
`

const BodyAndCat = styled.p`
    margin-top: 10px;
    margin-left: 20px;
    font-style: italic;
    font-size: 0.7em;
    color: var(--subTextColor);

`
const NameAndQuantity = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    flex-wrap: wrap;
`

const OuterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-left: 20vw; */
    /* margin-left: 10%; */

    
`

const ThanksMessage = styled.div`
display: flex;
flex-direction: column;
/* position: relative;
left: 31%; */
font-family: var(--font-heading);
color: var(--mainTextColor);
padding: 1em 0 1em 0;
font-size: 2em;
color: var(--mainTextColor);
margin-top: 35px;
margin-left: 350px;
margin-bottom: 10px;
`


const AmountofItem = styled.p`
    margin-top: 10px;
    margin-left: 20px;
    padding-top: 10px;
    /* border-top: 1px solid black; */
    /* position: relative; */
    
/* padding-bottom: 10px; */
/* border-bottom: 1px solid black; */
color: var(--mainTextColor);
font-size: 0.8em;
`

const ItemPrice = styled.p`
margin-top: 10px;
margin-bottom: 15px;
padding-bottom: 10px;
color: var(--mainTextColor)
`

const ProductName = styled.p`
    margin-top: 30px;
    margin-left: 20px;
/* position: relative;
top: 30%;
left: 5%; */
/* border-bottom: 1px solid black; */
color: var(--mainTextColor);

font-weight: bold;
`

const ItemInfoWrapper = styled.div`
    display: flex;
    /* justify-content: center; */
    flex-direction: row;
    position: relative;
    left: 20%;
    /* border-bottom: 1px solid black; */
    margin-top: 30px;
    margin-left: 135px;
    padding-left: 30px;
    padding-right: 75px;
    background-color: rgb(250, 251, 253);
`


const ItemInfoWrapper2 = styled.div`
    display: flex;
    /* justify-content: center; */
    flex-direction: row;
    /* position: relative;
    left: 20%; */
    /* border-bottom: 1px solid black; */
    margin-top: 30px;
    margin-left: 350px;
    padding-left: 30px;
    /* padding-right: 75px; */
    background-color: rgb(250, 251, 253);
`

const ProductImage = styled.img`
    display: flex;
    /* justify-content: center; */
    /* align-items: center; */
    /* flex-direction: column; */
    width: 120px;
    height: 120px;
    margin-bottom: 10px;
    margin-top: 10px;
    /* padding-bottom: 10px; */
    /* border-bottom: 1px solid black; */

`

const TotalPriceWrapper = styled.div` 
    display: flex;
    /* position: relative;
    left: 29%; */
    
    margin-top: 30px;
    /* justify-content: center; */
    /* align-items: center; */
    /* flex-direction: column; */
    
margin-left: 350px;
`

const TotalPriceWrapper2 = styled.div` 
    display: flex;
    /* position: relative;
    left: 29%; */
    
    margin-top: 30px;
    /* justify-content: center; */
    /* align-items: center; */
    /* flex-direction: column; */
    
margin-left: 350px;
`


const TotalPrice = styled.p`
    /* color: lightcoral; */
    font-size: 2em;
`

const Message = styled.h2`
    font-size: 25px;
`


