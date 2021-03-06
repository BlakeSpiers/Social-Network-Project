import React, { Component } from 'react'
import {singlePost, update} from "./apiPost"
import {isAuthenticated} from "../auth"
import {Redirect} from "react-router-dom"

export default class EditPost extends Component {
    constructor() {
        super()
        this.state={
            id: "",
            title: "",
            body: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            loading: false
        }
    }

    init = postId => {
        singlePost(postId).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    // id is not post.postedBy._id
                    id: data.postedBy._id,
                    title: data.title,
                    body: data.body,
                    error: ""
                });
            }
        });
    };

    componentDidMount() {
        this.postData = new FormData()
        const postId = this.props.match.params.postId
        this.init(postId)
    }

    isValid = () => {
        const {title, body, fileSize} = this.state
        if(fileSize > 100000){
            this.setState({error: "File size should be less than 100KB", loading: false})
            return false
        }
        if(title.length === 0){
            this.setState({error: "Title is required", loading: false})
            return false
        }
        if(body.length === 0){
            this.setState({error: "Body is required", loading: false})
            return false
        }
        return true
    }

    handleChange = name => event => {
        this.setState({error: ""})
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        const fileSize = name === 'photo' ? event.target.files[0].size : 0
        this.postData.set(name, value)
        this.setState({[name]: value, fileSize})
    }

    clickSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})
        if(this.isValid()){   
            const postId = this.state.id
            const token = isAuthenticated().token

            console.log(`PostId: ${postId}`)

            update(postId, token, this.postData)
            .then(data => {
                if(data.error) this.setState({error: data.error})
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        photo: "",
                        redirectToProfile: true
                    });
                }
            })
        }
    }

    editPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input onChange={this.handleChange("photo")} type="file" accept="image/*" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={this.handleChange("title")} type="text" className="form-control" value={title} />
            </div>
            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea onChange={this.handleChange("body")} type="text" className="form-control" value={body} />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update Post</button>
        </form>
    )

    renderImage = (id, title) => {
        return(
            <img 
                src={`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`} 
                alt={title}
                onError={
                    i =>
                    (i.target.style.display="none")
                }
                className="img-thumbnail mb-3"
                style={{height:"300px", width:"100%`", objectFit: "cover"}}
            />
        )
    }

    render() {
        const {id, title, body, redirectToProfile} = this.state

        if(redirectToProfile){
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />
        }
        
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{title}</h2>
                {!id ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : this.renderImage(id, title) }

                {this.editPostForm(title, body)}
                {isAuthenticated().user.role === "admin" ||
                    (isAuthenticated().user._id === id &&
                        this.editPostForm(title, body))}
            </div>
        )
    }
}
