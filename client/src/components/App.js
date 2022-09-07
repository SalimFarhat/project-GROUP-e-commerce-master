import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { FilteringProvider } from "./Context/FilteringContext";
import GlobalStyles from "./GlobalStyles";
import Header from "./Home/Header";
import Navigation from "./Home/Navigation"
import Home from "./Home/Home";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import Confirmation from "./Pages/Confirmation";
import SingleItem from "./SingleItem/SingleItem";
import NotFound from "./Pages/NotFound";
import TestCartContext from "./Context/TestCartContext"

function App() {
  
  return(
    <BrowserRouter>
    <GlobalStyles />
    <FilteringProvider>
    <Header />
      <Main>
      <Navigation />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/test-cart">
              <TestCartContext />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
            <Route exact path="/item/:item">
              <SingleItem />
            </Route>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
      </Main>
    </FilteringProvider>
    </BrowserRouter>
  );
}

const Main = styled.div`
  display: flex;
`;

export default App;
