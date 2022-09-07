import styled from "styled-components";
import { useContext } from "react";
import { FilteringContext } from "../Context/FilteringContext";
import ErrorMessage from "../Pages/ErrorMessage";
import About from "./About";
import ItemsPage from "./Items/ItemsPage";

const Home = () => {
    const { filters } = useContext(FilteringContext);
    return(
        <Wrapper>
            {filters === null && <About />}
            {filters !== null && <ItemsPage />}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100vw - 200px);
    min-height: calc(100vh - 110px);
    padding-right: 40px;
`;


export default Home;