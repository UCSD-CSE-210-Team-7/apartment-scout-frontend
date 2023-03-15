// Import required dependencies, components and assets.
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth";
import "../styles/NavBar.css";

/**
 * NavigationBar component displays the name of the website "aptcout". It contains three buttons on
 * the top right namely the home, chat and account buttons. All these buttons are linked to various
 * web pages. The home button will always bring the user back to the home page where they enter the
 * zip codes. the chat button will open the chat box where all the messages are saved. The account button
 * has 3 more options namely profile, tours and logout.
 * The navigation bar is consistent to all pages and always present on every page.
 * @returns {JSX.Element} The JSX element for the HomePageComponent.
 */

const NavigationBar = () => {
  const { logout } = useContext(Auth);
  const { pathname } = useLocation();

  const NavLink = ({ selected, href, match = [], children, style = {} }) => {
    const colorScheme =
      selected || pathname === href || match.includes(pathname)
        ? { color: "#023E8A", background: "#ADE8F4" }
        : { color: "#FFFFFF" };
    return (
      <Link to={href}>
        <span
          style={{
            cursor: "pointer",
            padding: "0 1vw",
            ...colorScheme,
            ...style,
          }}
        >
          {children}
        </span>
      </Link>
    );
  };

  if (pathname === "/") {
    return;
  }

  return (
    <nav
      style={{
        height: "10vh",
        alignItems: "center",
        padding: "1vw 3vw",
        background: "#023E8A",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* The links to all the various webpages are defined here on clicking the different functionalities. */}
      <Link to="/home">
        <div>
          <span style={{ fontSize: "3.5em", color: "#ADE8F4" }}>apt</span>
          <span style={{ fontSize: "3.5em", color: "#FFFFFF" }}>scout</span>
        </div>
      </Link>
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink href="/home">home</NavLink>
        <NavLink href="/chat">chat</NavLink>
        <div className="d">
          <NavLink href="/profile" match={["/profile", "/tours"]}>
            account
          </NavLink>
          <div className="dc">
            <NavLink href="/profile">profile</NavLink>
            <NavLink href="/tourhome">tours</NavLink>
            <span
              style={{ cursor: "pointer", color: "#FFFFFF" }}
              onClick={logout}
            >
              logout
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
