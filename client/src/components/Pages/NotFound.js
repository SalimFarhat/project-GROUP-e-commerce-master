import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";



const NotFound = () => {

    return(
        <Wrapper>
            <ErrorMessageWrapper>
                <ErrorMessage>
                    Oh my! It seems like you tried going to a page that does not exist! Please click on the button below to go back to the home page
                </ErrorMessage>
            </ErrorMessageWrapper>
            <BackButton >
                <BackLink to="/"><p>Go Back</p></BackLink>
            </BackButton>

        </Wrapper>

    )
}

export default NotFound;

const ErrorMessage = styled.h2`
    color:black;
`
const BackLink = styled(NavLink)`
    text-decoration: none;
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
flex-wrap: nowrap;
justify-content: space-evenly;
align-items: center;
align-content: stretch;
border: 3px groove var(--borderColor);
`

const ErrorMessageWrapper = styled.div`
    display: flex;
    margin: 20px;
`

const BackButton = styled.button`
    box-shadow:inset 0px 0px 0px 0px #97c4fe;
	background:linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%);
	background-color:#3d94f6;
	border-radius:18px;
	border:5px solid #337fed;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:18px;
	font-weight:bold;
	padding:10px 32px;
	text-decoration:none;
	text-shadow:0px 0px 0px #1570cd;
    margin-bottom: 20px;
    &:hover{
	background:linear-gradient(to bottom, #1e62d0 5%, #3d94f6 100%);
	background-color:#1e62d0;
    }
    &:active{
	position:relative;
	top:1px;

    }
`