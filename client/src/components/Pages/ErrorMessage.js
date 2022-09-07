import styled from "styled-components";
import { FiFrown } from "react-icons/fi";

const ErrorMessage = () => {
    return(
        <>
            <Wrapper>
                <FiFrown style={{fontSize: 56}}/>
            </Wrapper>
            <Message>An unknown error has occurred</Message>
            <Wrapper>
                <p>Try refreshing the page, contact support or watch <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank'>this tutorial</a> for some hints.</p>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    height: 20vh;
    justify-content: center;
    align-items: center;
`;

const Message = styled.p`
    font-family: monospace;
    font-size: 1.7em;
    font-weight: 700;
    text-align: center;
`;


export default ErrorMessage;