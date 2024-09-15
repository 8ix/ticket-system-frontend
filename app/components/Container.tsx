import React from 'react';
import styled from 'styled-components';

type ContainerProps = {
    children?: React.ReactNode;
}

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 1000px;
`;


const Container = (props:ContainerProps) => {

    return(
        <StyledContainer>
            {props.children}
        </StyledContainer>
    );
}

export default Container;