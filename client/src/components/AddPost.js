import React, { useState, useEffect } from 'react';
import axios from 'axios';

const defaultPost = {
    title: "",
    contents: "",
}

function AddPost(props) {
    const [newPost, setNewPost] = useState(defaultPost);

    const changeHandler = e => {
        e.preventDefault();
        setNewPost({...newPost, [e.target.name]: e.target.value})
    }

    const submitPost = e => {
        e.preventDefault();
        setNewPost(defaultPost);
        axios.post('http://localhost:5000/api/posts', newPost)
        .then(props.history.push('/'))
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Add a post!</h1>
            <form onSubmit={submitPost}>
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" value={newPost.title} onChange={changeHandler}></input>
                <br />
                <label htmlFor="contents">Contents: </label>
                <textarea type="text" name="contents" value={newPost.contents} onChange={changeHandler}></textarea>
                <br />
                <button type="submit">Submit Post</button>
            </form>
        </div>
    );
}

export default AddPost;
