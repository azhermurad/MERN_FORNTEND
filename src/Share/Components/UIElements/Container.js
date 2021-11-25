import React from 'react';
import './Container.css'

const Container = (props) => {
    return (
        <div className='Container' style={props.style}>
            {props.children}
        </div>
    );
};

export default Container;