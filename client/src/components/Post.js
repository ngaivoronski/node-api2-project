import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList(props) {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState({})

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
            setComments(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    const deletePost = () => {
        axios.delete(`http://localhost:5000/api/posts/${props.match.params.id}`)
        .then(props.history.push('/'))
        .catch(err => {
            console.log(err);
        })
    }

    const editPost = () => {
        if (!editing) {
            setEditing(true);
            setEditValue({
                title: post.title,
                contents: post.contents,
            })
        } else {
            setEditing(false);
            axios.put(`http://localhost:5000/api/posts/${props.match.params.id}`, editValue)
            .then(res => {
                setPost(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    const editChange = e => {
        e.preventDefault();
        setEditValue({...editValue, [e.target.name]: e.target.value});
    }

    if(!editing){
        return (
            <div>
                <h1>Post</h1>
                <div className="post-div">
                    <h4>{post.title}</h4>
                    <p>{post.contents}</p>
                    <p>Posted: {post.created_at}</p>
                    <p>Edited: {post.updated_at}</p>
                </div>
                <button onClick={editPost}>Edit Post</button>
                <button onClick={deletePost}>Delete Post</button>
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
                <button onClick={() => props.history.push(`/posts/${props.match.params.id}/addcomment`)}>Add Comment</button>
            </div>
        );
    } else {
        return(
            <div>
                <h1>Post</h1>
                <div className="post-div">
                    <input value={editValue.title} name="title" onChange={editChange}></input><br />
                    <input value={editValue.contents} name="contents" onChange={editChange}></input>
                    <p>Posted: {post.created_at}</p>
                    <p>Edited: {post.updated_at}</p>
                </div>
                <button onClick={editPost}>Submit Edits</button>
                <button onClick={deletePost}>Delete Post</button>
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
                <button onClick={() => props.history.push(`/posts/${props.match.params.id}/addcomment`)}>Add Comment</button>
            </div>
        );
    }

    
}

export default PostList;
