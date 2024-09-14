import React from 'react';
import styled from 'styled-components';

type NavBarProps = {
    children?: React.ReactNode;
}


const NavBar = (props:NavBarProps) => {

    return(
        <div>
            NavBar
            {props.children}
        </div>
    );
}

export default NavBar;