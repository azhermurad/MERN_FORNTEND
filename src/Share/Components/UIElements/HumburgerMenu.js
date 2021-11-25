import React from "react";
import './HumburgerMenu.css'

const HumburgerMenu = (props) => {
    return (
        <button 
            className={`Humberger-btn ${props.className ? props.className:''}`}
            style={props.style}
            onClick={props.onClick} >
            <span></span>
            <span></span>
            <span></span>
            
        </button>
    );
};

export default HumburgerMenu;
