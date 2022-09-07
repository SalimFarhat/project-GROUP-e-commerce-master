import styled from "styled-components";
import { useContext } from 'react';
import { FilteringContext } from "../Context/FilteringContext";

const Navigation = () => {
    const { filters,
        setFilters,
        bodyLocations,
        categoriesArr,
        selectedCategory,
        setSelectedCategory,
        selectedPart,
        setSelectedPart
    } = useContext(FilteringContext);   
    console.log(categoriesArr);
    
    return(
        <Wrapper>
                <Select value={selectedCategory} onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setFilters({...filters, category: e.target.value})
                        }
                    }
                >
                    <option value="">Select a category</option>
                    <option value="View all">View all</option>
                    {categoriesArr.map(item => {
                        return(
                            <option key={item} value={item}>{item}</option>
                        )
                    })}
                </Select>
                <Select value={selectedPart} onChange={(e) => {
                        setSelectedPart(e.target.value);
                        setFilters({...filters, bodyLocation: e.target.value})
                        }
                    }
                >
                    <option value="">Filter by body part</option>
                    <option value="View all">View all</option>
                    {bodyLocations.map(item => {
                        return(
                            <option key={item} value={item}>{item}</option>
                        )
                    })}
                </Select>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: var(--navigationColor);
    width: 200px;
    padding: 10px;
`;

const Select = styled.select`
    cursor: pointer;
    max-width: 200px;
    height: 30px;
    margin: 20px 10px;
    border-color: var(--veryLightGreyBorder);
    background-color: var(--itemBackground);
    color: var(--subTextColor);

    & option {
        background-color: var(--itemBackground);
    }
`;

export default Navigation;