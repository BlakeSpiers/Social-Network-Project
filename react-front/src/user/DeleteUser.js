import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {remove} from "./apiUser"
import {signout} from "../auth"

export default class DeleteUser extends Component {

    state = {
        redirect: false
    }

    deleteAccount = () => {
        const token = isAuthenticated().token
        const userId = this.props.userId
        remove(userId, token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                signout(() => console.log("User has been deleted"))

                this.setState({redirect: true})
            }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure that you want to delete your account?")
        if(answer){
            this.deleteAccount()
        }
    }

    render() {
        if(this.state.redirect){
            return <Redirect to="/"/>
        }
        return (
            <div>
                <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">Delete Profile</button>
            </div>
        )
    }
}
