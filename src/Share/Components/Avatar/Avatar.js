import React from 'react';
import './Avatar.css';
const Avatar = (props) => {
    return (
        <div className={`avatar ${props.class}`}>
            <img src={props.src} alt={props.alt} style={props.style}  />
        </div>
    );
};

export default Avatar;