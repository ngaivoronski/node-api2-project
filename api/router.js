const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.use(express.json());

// Get a list of posts

router.get('/', (req , res)=>{
    db.find()
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

// Get a specific post

router.get('/:id', (req , res)=>{
    db.findById(req.params.id)
        .then(post => {
            if(post[0]) {
                res.status(201).json(post[0]);
            } else {
                res.status(404).json({ error: "The post with the specified ID does not exist." });
            }
            
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

// Get comments for a post

router.get('/:id/comments', (req , res)=>{
    db.findById(req.params.id)
        .then(post => {
            if(post[0]) {
                db.findPostComments(req.params.id)
                    .then(comments => {
                        if(comments[0]) {
                            res.status(201).json(comments);
                        } else {
                            res.status(404).json({ error: "The post has no comments." });
                        }
                        
                    })
                    .catch(err => {
                        res.status(500).json({ error: "The comments information could not be retrieved." });
                    });
            } else {
                res.status(404).json({ error: "The post with the specified ID does not exist." });
            }
            
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
    
});

// post a new post

router.post('/', (req , res)=>{
    const newPost = req.body;

    if(newPost.title && newPost.contents) {
        db.insert(req.body)
            .then(data =>{
                db.findById(data.id).then(post => res.status(201).json(post[0]));
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            })
    } else {
        res.status(400).json({ error: "Please provide title and contents for the post." });
    }
});

// Make a comment for a post

router.post('/:id/comments', (req , res) => {
    const newComment = ({...req.body, post_id: req.params.id });

    if(newComment.text) {
        db.insertComment(newComment)
            .then(id => {
                res.status(201).json({...req.body, ...id});
            })
            .catch(err => {
                console.log(err);
                if(err.code === "SQLITE_CONSTRAINT") {
                    res.status(404).json({ error: "The post with the specified ID does not exist." })
                } else {
                    res.status(500).json({ error: "There was an error while saving the post to the database" });
                }
            })
    } else {
        res.status(400).json({ error: "Please provide test and post ID for the comment." });
    }
});

// Delete a post

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
        .then(recordsDeleted => {
            console.log("this was the response", data);
            if(recordsDeleted > 0) {
                res.status(200).json({ error: "The post was deleted." });
            } else {
                res.status(404).json({ error: "The user with the specified ID does not exist." }); 
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" });
        });
});

// Edit a post

router.put('/:id', (req, res) => {
    const editedPost = req.body;

    if(editedPost.title && editedPost.contents) {
        db.update(req.params.id, editedPost)
            .then(recordsUpdated => {
                if(recordsUpdated > 0 ){
                    return db.findById(req.params.id)
                        .then(post => {
                            if(post[0]) {
                                res.status(200).json(post[0]);
                            }
                        })
                } else {
                    res.status(404).json({ error: "The post with the specified ID does not exist." });
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The posts information could not be retrieved." });
            });
    } else {
        res.status(400).json({ error: "Please provide title and contents for the post." });
    }
    
});



// export default router; // ES6 Modules
module.exports = router;