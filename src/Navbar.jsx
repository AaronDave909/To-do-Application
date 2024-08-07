import React from 'react';
import './Navbar.css';
import lexmeet from './assets/main-white.png';
import Clock from './Clock.jsx'

const Navbar = () => {
    return(
        <div className='lexmeetnavbar'>
            <img src={lexmeet} alt='Lexmeet Logo' className='logo'/>
    
            <Clock/>
            
        </div>
    );
}

export default Navbar;