import React from 'react';
import ReactDOM from 'react-dom';
import './backdrop.css'

const Backdrop = (props) => {
    const content = (
    <div 
        className={`backdrop ${props.className ? props.className:''}`}
        onClick={props.onClick}
        style={props.style}
    >
    </div>
)
    return ReactDOM.createPortal(content, document.querySelector("#backdrop_container"))
        
};

export default Backdrop;