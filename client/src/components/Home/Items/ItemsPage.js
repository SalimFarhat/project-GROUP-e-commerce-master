import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { FilteringContext } from "../../Context/FilteringContext";
import SmallItem from "./SmallItem";

const ItemsPage = () => {
    const { filters, setFilters } = useContext(FilteringContext);
    const [status, setStatus] = useState("loading");
    const [results, setResults] = useState([]);
    const [resultCount, setResultCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentBodyLocation, setCurrentBodyLocation] = useState("");
    const [selectedNumbOfItems, setSelectedNumbOfItems] = useState("");

    // here we declare the variables we will need to pass in our POST request
    // and assign them the value of the filters chosen by the user or its default
    const declareCategory = () => {
        if (filters.category === "View all") return "";
        else return filters.category;
    }
    const declareBodyLocation = () => {
        if (filters.bodyLocation === "View all") return "";
        else return filters.bodyLocation;
    }
    const category = declareCategory() || "";
    const bodyLocation = declareBodyLocation() || "";
    const nbPerPage = filters.nbPerPage || 25;
    const nbOfPages = Math.floor(resultCount / nbPerPage);
    let page = filters.page || 1;

    // pagination previous and next
    const handleNext = () => {
        // we need to calculate the number of possible pages per response and set that as the maximum
        // and only go to the next page if the current page is less than the total number of pages
        if (currentPage <= nbOfPages) {
            setFilters({...filters, page: page + 1});
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (page !== 1) setFilters({...filters, page: page - 1})
    };
    // end of pagination

    useEffect(() => {
        // we need to make sure we don't try to fetch while on a page that isn't the first one
        if (currentCategory !== category || currentBodyLocation !== bodyLocation) {
             page = 1;
        };
        fetch(`/api/getItems?page=${page}&nbPerPage=${nbPerPage}&category=${category}&bodyLocation=${bodyLocation}`)
        .then(res => res.json())
        .then(data => {
            // console.log("DATA",data)
            // if invalid request tell the user
            if (data.status === 404) return setStatus(data.status);
            // on refetch keep going as usual
            setStatus(data.status);
            setResults(data.data.items);
            setResultCount(data.data.count); 
            setCurrentCategory(category);  
            setCurrentBodyLocation(bodyLocation);   
        })
        .catch((error) => {
            console.error('Error:', error);
            setStatus(500);
        });
    }, [filters])

    return(
        <Wrapper>
            {status === 404 &&
            <NotFoundWrapper>
                <Header>There was a problem fiding those items</Header>
                <p>Try a new search or view all</p>
            </NotFoundWrapper>
            }
            {status === 200 && 
            <Wrapper>
                <SelectFiltersWrapper>
                        <ChangePage onClick={handlePrevious}> ← prev </ChangePage>
                        <Select value={selectedNumbOfItems} onChange={(e) => {
                            setSelectedNumbOfItems(e.target.value);
                            setFilters({...filters, nbPerPage: e.target.value})
                            }
                        }
                    >
                        <option value="">Results per page</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        </Select>
                        <ChangePage onClick={handleNext}> next → </ChangePage>
                </SelectFiltersWrapper>
                

                {results.map(item => {
                    return(
                        <SmallItem key={item._id} item={item}/>
                    )
                })}
                <Pagination>
                    <ChangePage onClick={handlePrevious}> ← prev </ChangePage>
                    <ChangePage onClick={handleNext}> next → </ChangePage>
                </Pagination>
            </Wrapper>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: calc(100vw - 200px);
    /* min-height: calc(60vw - 110px); */
`;

const NotFoundWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SelectFiltersWrapper = styled.div`
    display: flex;
    padding: 20px;
    max-height: 65px;
    width: calc(100vw - 200px);
    justify-content: center;
`;

const Select = styled.select`
    cursor: pointer;
    width: 140px;
    height: 20px;
    /* margin: 20px 10px; */
    border-color: var(--veryLightGreyBorder);
    background-color: var(--itemBackground);
    color: var(--subTextColor);

    & option {
        background-color: var(--itemBackground);
    }
`;

const Pagination = styled.div`
    position: relative;
    bottom: 10px;
    margin-top: 20px;
    padding: 150px 20px 0 20px;
    display: flex;
    justify-content: center;
    width: calc(100vw - 200px);
`;

const ChangePage = styled.button`
    opacity: .8;
    cursor: pointer;
    width: 80px;
    margin: 0;
    background: transparent;
    border: none;
    color: var(--subTextColor);
`;

const Header = styled.div`
    font-family: var(--font-body);
    color: var(--mainTextColor);
    padding: 2em 0;
    font-size: 2em;
`;

export default ItemsPage;