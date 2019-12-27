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

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/users")} to="/users">Users</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" 
                to={`/post/create`} 
                style={isActive(history, `/post/create`)}>
                    Create Post
                </Link>
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
                        <Link className="nav-link" 
                        to={`/findpeople`} 
                        style={isActive(history, `/findpeople`)}>
                            Find People
                        </Link>
                    </li>

                    
                    <li className="nav-item">
                        <Link className="nav-link" 
                        to={`/user/${isAuthenticated().user._id}`} 
                        style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <button type="button" className="btn-link nav-link" style={{cursor: "pointer", color: "#ffffff"}} onClick={() => signout(() => history.push("/"))}>Sign Out</button>
                    </li>
                </>
            )} 

            {isAuthenticated() && isAuthenticated().user.role === "admin" && (
                <li className="nav-item">
                    <Link
                        to={`/admin`}
                        style={isActive(history, `/admin`)}
                        className="nav-link"
                    >
                        Admin
                    </Link>
                </li>
            )}
            
        </ul>
    </div>
)

export default withRouter(Menu)