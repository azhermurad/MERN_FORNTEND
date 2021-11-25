import React from 'react';
import './Errorshow.css';

const ErrorShower = (props) => {
    console.log(props)

    return (
        <>
            <div className="error__show--container">
               {props.error.map((element,index)=> <span className="error__items" key={index}>{element.msg}</span>)}
            </div>
        </>
    )
};

export default ErrorShower;