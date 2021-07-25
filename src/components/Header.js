import React from 'react'
import logo from '../assets/images/bitcoin-logo.png';

const Header = ({ title }) => {
    return (

        <header className="header">
            <img src={logo} className="logo" alt="Bitcoin Logo" />
            <h1 className="heading">{title}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: "Bitcoin Daily Price"
}

export default Header

