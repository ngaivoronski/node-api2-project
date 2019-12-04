import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultComment = {
    text: "",
}

function AddComment(props) {
    const [newComment, setNewComment] = useState(defaultComment);

    const changeHandler = e => {
        e.preventDefault();
        setNewComment({...newComment, [e.target.name]: e.target.value})
    }

    const submitComment = e => {
        e.preventDefault();
        setNewComment(defaultComment);
        axios.post(`http://localhost:5000/api/posts/${props.match.params.id}/comments`, newComment)
        .then(props.history.push(`/posts/${props.match.params.id}`))
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Add a comment!</h1>
            <form onSubmit={submitComment}>
                <label htmlFor="title">Title: </label>
                <label htmlFor="text">Comment: </label>
                <textarea type="text" name="text" value={newComment.text} onChange={changeHandler}></textarea>
                <br />
                <button type="submit">Submit Comment</button>
            </form>
        </div>
    );
}

export default AddComment;
