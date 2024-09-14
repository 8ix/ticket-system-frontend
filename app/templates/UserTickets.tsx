import React from 'react';
import styled from 'styled-components';

type UserTicketsProps = {
    children?: React.ReactNode;
}


const UserTickets = (props:UserTicketsProps) => {

    return(
        <div>
            Open Tickets Template
            {props.children}
        </div>
    );
}

export default UserTickets;