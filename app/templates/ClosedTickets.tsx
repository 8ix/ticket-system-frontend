import React from 'react';
import styled from 'styled-components';

type ClosedTicketsProps = {
    children?: React.ReactNode;
}


const ClosedTickets = (props:ClosedTicketsProps) => {

    return(
        <div>
            Closed Tickets Template
            {props.children}
        </div>
    );
}

export default ClosedTickets;