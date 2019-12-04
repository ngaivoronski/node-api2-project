import React, { useState, useEffect } from 'react';
import { Route, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';
import PostList from './components/PostList';
import Post from './components/Post';
import AddPost from './components/AddPost';
import AddComment from './components/AddComment';

function App() {
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
    <div className="App">
      <Route exact path="/" component={PostList} />
      <Route exact path="/addpost" component={AddPost} />
      <Route
        path="/posts/:id"
        render={props => {
          return <Post {...props} />;
        }}
      />
      <Route
        path="/posts/:id/addcomment"
        render={props => {
          return <AddComment {...props} />;
        }}
      />
    </div>
  );
}

export default App;
