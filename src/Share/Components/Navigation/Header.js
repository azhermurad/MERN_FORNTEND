import React from 'react';
import Card from '../UIElements/Card'
import './Header.css';

const Header = (props) => {
    return (
        <header >
            <Card className="main-header__container">
                {props.children}
            </Card>
        </header>
    );
};

export default Header;