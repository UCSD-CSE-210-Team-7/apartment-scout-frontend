import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/NavBar.css';

const NavigationBar = () => {

    const { logout } = useContext(Auth);
    const { pathname } = useLocation()

    const NavLink = props => {
        const colorScheme = (props.selected || pathname === props.href) ? {color: '#023E8A', background: '#ADE8F4'} : {color: '#FFFFFF'}
        return (
            <Link to={props.href}>
                <span style={{ cursor: 'pointer', padding: '0 1vw', ...colorScheme}}>{props.children}</span>
            </Link>
        )
    }

    if(pathname === '/'){
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
                <div className="dropdown">
                <NavLink href="/profile">account</NavLink>
                  <div className="dropdown-content">
                    
                    <Link to='/profile'>
                      <button className="dropdown">Account Settings</button>
                    </Link>
                    {/*
                    <Link to='/friends'>
                      <button className="dropdown">Friends</button>
                    </Link>
                    */}
                    <button className="dropdown"
                      onClick={logout}>Sign out</button>
                  </div>
                </div>
                <span style={{ cursor: 'pointer', padding: '0 1vw', color: '#FFFFFF'}} onClick={logout}>logout</span>
            </div>
        </nav >
    )
}

export default NavigationBar;
