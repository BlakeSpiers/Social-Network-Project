import React from 'react'
import {Link, withRouter } from 'react-router-dom'
import {signout, isAuthenticated} from "../auth"

const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9900"}
        else return {color: "#ffffff"}
}

const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
            </li>

            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Sign Up</Link>
                    </li>
                </>                
            )}

            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <button type="button" className="btn-link nav-link" style={{cursor: "pointer", color: "#ffffff"}} onClick={() => signout(() => history.push("/"))}>Sign Out</button>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}'s profile`}</Link>
                    </li>
                </>
            )} 
            
        </ul>
    </div>
)

export default withRouter(Menu)