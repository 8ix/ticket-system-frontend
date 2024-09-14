import React from 'react';
import styled from 'styled-components';

type OpenTicketsProps = {
    children?: React.ReactNode;
}


const OpenTickets = (props:OpenTicketsProps) => {

    return(
        <div>
            Open Tickets Template
            {props.children}
        </div>
    );
}

export default OpenTickets;