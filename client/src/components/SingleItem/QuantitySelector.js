/***
 * @author Frederic Brockow
 *  Component that renders the quantity selection drop down 
 *  and returns the value selected via handleSelectChange
 */

import styled from "styled-components";


const QuantitySelector = ({selectedQuantity, handleSelectChange, quantityAvailable, id}) => {
    
    return (
        <Select value={selectedQuantity} onChange={(e) => handleSelectChange (e, id)}> 
        <>
            {Array.from(Array(quantityAvailable), (element, index) => {
                return <option value = {element} key = {index*id}>{index+1}</option>
            } )}
        </>
        </Select>
    );
};

const Select = styled.select`
    cursor: pointer;
    border-color: var(--veryLightGreyBorder);
    background-color: var(--itemBackground);
    padding-left: 5px;
    color: var(--subTextColor);

    & option {
        background-color: var(--itemBackground);
    }
`;

export default QuantitySelector;