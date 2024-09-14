import React from 'react';
import styled from 'styled-components';

type TableProps = {
    children?: React.ReactNode;
}


const Table = (props:TableProps) => {

    return(
        <div>
            Table
            {props.children}
        </div>
    );
}

export default Table;