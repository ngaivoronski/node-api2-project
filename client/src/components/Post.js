import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList(props) {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${props.match.params.id}`)
        .then(res => {
            setPost(res.data);
        })
        .catch(err => {
            console.log(err);
        })

        axios.get(`http://localhost:5000/api/posts/${props.match.params.id}/comments`)
        .then(res => {
            console.log(res.data);
            setComments(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    return (
        <div>
            <h1>Post</h1>
            <div className="post-div">
                <h4>{post.title}</h4>
                <p>{post.contents}</p>
                <p>Posted: {post.created_at}</p>
                <p>Edited: {post.updated_at}</p>
            </div>
            <h1>Comments</h1>
            {comments.map(comment => {
                return(
                    <div className="comment-div">
                        <p><b>{comment.text}</b></p>
                        <p>Posted: {comment.created_at}</p>
                        <p>Edited: {comment.updated_at}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default PostList;
