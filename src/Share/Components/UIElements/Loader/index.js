import React from 'react';
import Backdrop from '../Backdrop';
import './loader.css';

const Loader = () => {
    return (
        <>
            <Backdrop />
            <div className="loading__spinner--overlay">
                <div className="lds-dual-ring">
                </div>
            </div>
        </>
    )
};

export default Loader;