import React, { useState } from 'react';
import Header from './Header';
import HumburgerMenu from '../UIElements/HumburgerMenu';
import NavLinks from './NavLinks';
import Sidedrawer from '../UIElements/sidedrawer';
import Backdrop from '../UIElements/Backdrop';


const MainHeader = () => {
    const [isSideDrawerOpen, setSideDrawer] = useState(false);
    const sideDrawerOpenHandler = () => {
        setSideDrawer(true)
    };
    const sideDrawerClose = () => {
        setSideDrawer(false)
    };
    return (
        <>
            {isSideDrawerOpen && <Backdrop onClick={sideDrawerClose} />}
            <Sidedrawer isSideDrawerOpen={isSideDrawerOpen} onClick={sideDrawerClose}>
                <NavLinks className="sidedrawer__nav" />
            </Sidedrawer>
            <Header>
                <HumburgerMenu onClick={sideDrawerOpenHandler} />
                <h3>MERNCOURSE</h3>
                <NavLinks className="header-menu__navlinks" />
            </Header>
        </>
    );
};

export default MainHeader;