import React from 'react';
import { Button, ButtonGroup, Flex, Text, Spinner, Box } from '@chakra-ui/react';
import styled from 'styled-components';

type PaginationProps = {
    onClickNext: Function,
    onClickPrev: Function,
    currentPage: number,
    totalPages: number
}

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;


const Pagination = (props:PaginationProps) => {

    return(
        <PaginationWrapper>
                <Flex justify="center" align="center" mt={4}>
                    <ButtonGroup isAttached variant="outline">
                        <Button
                            onClick={() => props.onClickPrev()}
                            isDisabled={props.currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={() => props.onClickNext()}
                            isDisabled={props.currentPage === props.totalPages}
                        >
                            Next
                        </Button>
                    </ButtonGroup>
                    <Text ml={4}>
                        Page {props.currentPage} of {props.totalPages}
                    </Text>
                </Flex>
            </PaginationWrapper>
    );
}

export default Pagination;