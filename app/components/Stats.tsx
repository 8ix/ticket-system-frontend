import React from 'react';
import styled from 'styled-components';

type StatsProps = {
    children?: React.ReactNode;
}


const Stats = (props:StatsProps) => {

    return(
        <div>
            Stats
            {props.children}
        </div>
    );
}

export default Stats;