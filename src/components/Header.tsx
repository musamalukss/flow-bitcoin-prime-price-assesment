import {FC} from 'react'
import logo from '../assets/images/bitcoin-logo.png';



/**
 * Header component renders the log and heading of the application
 * 
 * @returns returns rendered header
 */

const Header : FC = () => {
    return (

        <header className="header">
            <img src={logo} className="logo" alt="Bitcoin Logo" /> 
         
            <h1 className="heading">Bitcoin  Price</h1>
        </header>
    )
}


export default Header

