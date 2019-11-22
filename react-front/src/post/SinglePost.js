import React, { Component } from 'react'

export default class SinglePost extends Component {
    render() {
        return (
            <div>
                <h2>Single Post</h2>
                {this.props.match.params.postId}
            </div>
        )
    }
}
