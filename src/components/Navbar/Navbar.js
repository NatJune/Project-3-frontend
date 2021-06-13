import React from 'react';
import { login, logout } from '../../services/firebase';



    const Navbar = (props) => {
        return (
            <div>
            <nav>
                <div class="nav-wrapper">
                <a href="http://google.com" class="brand-logo">My Expert App</a>
                {/* <div class="input-field">
                    <input id="search" type="search" required />
                    <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                    <i class="material-icons">close</i>
                </div> */}
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a href="sass.html"><i class="material-icons">🔍</i></a></li>
                    <li><a href="sass.html">Expert</a></li>
                    <li><a href="badges.html">Comments</a></li>
                    <li><a href="collapsible.html">Comments</a></li>
                    {props.user ? <>
                        <li>Welcome, {props.user.displayName}</li>
                        <li><img style={{height: '2.8rem', borderRadius: '50%'}} src={props.user.photoURL} alt={props.user.displayName} /></li>
                        <li style={{cursor: "pointer", fontweight: 700}} onClick={logout}>Logout</li>                    
                        </> : 
                        <li style={{cursor: "pointer", fontweight: 700}} onClick={login}>Login</li>
                    }
                    
                </ul>   
                </div>
      
            </nav>
            </div>
        )
    }




export default Navbar

// class Navbar extends Component 
    // render () {