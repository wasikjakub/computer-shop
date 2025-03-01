import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import "../styles/Header.css";
import { COMPANY_NAME } from "../constants";

function Header() {
    const { isAuthorized, user, logout } = useContext(AuthContext);
    return (
        <header className="header">
            <div className="logo-container">
                {/* Placeholder for the logo */}
                <img src="/images/logo.png" alt="Logo" className="logo"/>
                <h1 className="company-name">{COMPANY_NAME}</h1>
            </div>
            <nav className="auth-links">
            {isAuthorized === null ? (
                    <li>Ładowanie...</li>
                ) : isAuthorized ? (
                    <>
                        <span>Welcome, {user?.email || "User"}!</span>
                        <a href="/" className="nav-link">
                        <a href="/profile" className="navlink"> Profil </a>
                        <span className="divider">|</span>
                        <a href="/basket" className="navlink"> Koszyk </a>
                        <span className="divider">|</span>
                        <span className="navbar-link" onClick={logout}>
                            Wyloguj
                        </span>
                        </a><br/>
                    </>
                ) : (
                    <>
                        <a href="/login">Logowanie</a>
                        <span className="divider">|</span>
                        <a href="/register">Rejestracja</a>
                    </>
                    )}
            </nav>
        </header>
    );
}

export default Header;