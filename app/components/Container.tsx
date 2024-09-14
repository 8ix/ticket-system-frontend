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
    max-width: 1200px;
    min-width: 800px;
`;


const Container = (props:ContainerProps) => {

    return(
        <StyledContainer>
            {props.children}
        </StyledContainer>
    );
}

export default Container;