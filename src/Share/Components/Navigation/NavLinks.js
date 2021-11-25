import React, { useContext } from 'react';
import NavList from './Nav/Navlist';
import Navitem from './Nav/Navitem';
import { Cotext } from '../../../Context/auth';
import './NavLinks.css'
import Button from '../UIElements/Button';

const NavLinks = (props) => {
    const auth = useContext(Cotext);
    const authRouter = [
        {
            path: '/',
            title: 'All Users',
            exact: true
        },
        {
            path: `/${auth?.user?.id}/places`,
            title: 'My Places'
        },
        {
            path: '/places/new',
            title: 'Add Places'
        }
    ];
    const unAuthRouter = [
        {
            path: '/',
            title: 'All Users',
            exact: true
        },
        {
            path: '/auth',
            title: 'Authantication'
        }

    ];
    let route;
    if (auth.isLoggedIn) {
        route = authRouter
    } else {
        route = unAuthRouter
    }

    return (
        <nav className={props.className}>
            <NavList>
                {route.map((ite, index) => <Navitem key={index} title={ite.title} path={ite.path} exact={ite.exact} />)}
                {auth.isLoggedIn &&
                    <li className="navlink-item login__btn">
                        <Button onClick={auth.logout}>Logout</Button>
                    </li>
                }
            </NavList>
        </nav>
    );
};

export default NavLinks;