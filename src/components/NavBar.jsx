import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
import styles from '../styles/NavBar.css';

const NavigationBar = () => {

    const { user, handleSignOut } = useContext(Auth);
    const { pathname } = useLocation()

    const NavLink = props => {
        const colorScheme = (props.selected || pathname === props.href) ? {color: '#023E8A', background: '#ADE8F4'} : {color: '#FFFFFF'}
        return (
            <Link to={props.href}>
                <span style={{ cursor: 'pointer', padding: '0 1vw', ...colorScheme}}>{props.children}</span>
            </Link>
        )
    }

    if(pathname == '/'){
        return;
    }

    return (
        <nav style={{ padding: '1vw 3vw', background: "#023E8A", display: 'flex', justifyContent: 'space-between'}}>
            <Link to="/home">
                <div>
                    <span style={{ color: '#ADE8F4'}}>apt</span>
                    <span style={{ color: '#FFFFFF'}}>scout</span>
                </div>
            </Link>
            <div>
                <NavLink href="/home">home</NavLink>
                <NavLink href="/chat">chat</NavLink>
                <NavLink href="/profile">account</NavLink>
            </div>
        </nav >
    )
}

export default NavigationBar;
