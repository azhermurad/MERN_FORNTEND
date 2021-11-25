import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navitem.css'

const Navitem = (props) => {
    return (
        <li className="navlink-item">
            <NavLink to={props.path} exact={props.exact}>{props.title}</NavLink>
        </li>
    );
};

export default Navitem;