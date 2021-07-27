import {FC} from 'react'
import logo from '../assets/images/bitcoin-logo.png';


const Header : FC = () => {
    return (

        <header className="header">
            <img src={logo} className="logo" alt="Bitcoin Logo" /> 
         
            <h1 className="heading">Bitcoin  Price</h1>
        </header>
    )
}


export default Header

