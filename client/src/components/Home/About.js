import styled from "styled-components";
import { FiActivity } from "react-icons/fi";

const About = () => {
    return(
        <Wrapper>
            <h1>Welcome to WearTech</h1>
            <p>Start by selecting a category to browse some of the latest wearable technology out there.</p>
            <Icon />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80%;
    font-style: var(--font-body);
    color: var(--mainTextColor);
    margin: 40px;

    h1 {
        font-size: 2.5em;
        margin: 5px;
    }

    p {
        margin: 5px;
    }
`;

const Icon = styled(FiActivity)`
    color: var(--accentColor);
    font-size: 4em;
    margin: 10px;
`;

export default About;
