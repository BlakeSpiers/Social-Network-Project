import React, { Component } from 'react'
import {comment, uncomment} from './apiPost'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

export default class Comment extends Component {

    state={
        text: ""
    }

    handleChange = event => {
        this.setState({text: event.target.value})
    }

    addComment = event => {
        event.preventDefault()
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        const postId = this.props.postId       

        comment(userId, token, postId, {text: this.state.text})
        .then(data=> {
            if(data.error){
                console.log(data.error)
            } else {
                this.setState({text: ""})
                //dispatch fresh list of comments to parent component
                this.props.updateComments(data.comments)
            }
        })
    }

    render() {
        return (
            <div>
                <h2 className="mt-5 mb-5">Leave a comment</h2>

                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            onChange={this.handleChange} 
                            className="form-control"
                        />
                    </div>
                </form>
            </div>
        )
    }
}
