import React, { Component } from 'react'
import {comment, uncomment} from './apiPost'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import DefaultProfile from "../images/avatar.jpg"

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
        const {comments} = this.props

        return (
            <div>
                <h2 className="mt-5 mb-5">Leave a comment</h2>

                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            onChange={this.handleChange} 
                            value={this.state.text}
                            className="form-control"
                            placeholder="Leave a comment..."
                        />
                        <button className="btn btn-raised btn-success mt-2">Post</button>
                    </div>
                </form>

                <div className="col-md-12">
                    <h3 className="text-primary">{comments.length} Comments</h3>
                        <hr/>
                        {comments.map((comment, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${comment.postedBy._id}`}>
                                        <img 
                                            style={{
                                                borderRadius: "50%", 
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i => (i.target.src = `${DefaultProfile}`)}
                                            src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                                            alt={comment.postedBy.name}
                                        />
                                    </Link>
                                    <div>
                                        <p className="lead">{comment.text}</p>
                                        <br/>
                                        <p className="font-italic mark">
                                            Posted by {" "} <Link to={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}</Link>
                                            {" "}
                                            on{" "}{new Date(comment.created).toDateString()}
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        )
    }
}
