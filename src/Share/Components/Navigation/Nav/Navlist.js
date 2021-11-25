import React from 'react';
import './Navlist.css'

const NavList = (props) => {
    return (
        <ul className='navlink-list'>
           {props.children}
        </ul>
    );
};

export default NavList;