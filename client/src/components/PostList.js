import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts/')
        .then(res => {
        setPosts(res.data);
        })
        .catch(err => {
        console.log(err);
        })
    },[]);

    return (
        <div>
        <h1>Posts</h1>
        {posts.map(post => {
            return(
            <div style={{'border':'1px solid black'}} onClick={() => props.history.push(`/posts/${post.id}`)}>
                <h4>{post.title}</h4>
                <p>{post.contents}</p>
                <p>Posted: {post.created_at}</p>
                <p>Edited: {post.updated_at}</p>
            </div>
            )
        })}
        </div>
    );
}

export default PostList;
