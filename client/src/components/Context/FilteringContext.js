import {useState, createContext, useEffect } from 'react';

export const FilteringContext = createContext();

export const FilteringProvider = ({children}) => {
    const [filters, setFilters] = useState(null);
    const [bodyLocations, setBodyLocations] = useState([]);
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPart, setSelectedPart] = useState("");
    // console.log(filters);

    useEffect(() => {
        fetch("/api/getItemsBodyLocations")
        .then(res => res.json())
        .then(data => {
            setBodyLocations(data.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [filters])

    useEffect(() => {
        fetch('/api/getItemsCategories')
        .then(res => res.json())
        .then (data => {
            console.log(data)
            setCategoriesArr(data.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);


    return(
        <FilteringContext.Provider value={{filters,
            setFilters,
            bodyLocations,
            categoriesArr,
            currentPage,
            setCurrentPage,
            selectedCategory,
            setSelectedCategory,
            selectedPart, setSelectedPart
            }}
        >
            {children}
        </FilteringContext.Provider>
    )
}