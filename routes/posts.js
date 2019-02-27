const auth = require('../middleware/auth');
const _ = require('lodash');
const {Post, validate} = require('../models/Post');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


router.get("/", [auth], async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
  });
  router.get("/:id", [auth], async (req, res) => {
    const post = await Post.findById(req.params.id);
  
    if (!post)
      return res.status(404).send("The post with the given ID was not found.");
  
    res.send(post);
  });
  
  router.post("/", auth, async (req, res) => { 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user.');
  
    let post = new Post({
      user: user,
      text: req.body.text,
      name: req.body.name, 
      likes: req.body.likes,
      comments: req.body.comments
    });
    post = await post.save();
  
    res.send(post);
  });
  
  router.put("/:id", [auth], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user.');
  
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
      user: user,
      text: req.body.text,
      name: req.body.name,
      likes: req.body.likes,
      comments: req.body.comments
      },
      {
        new: true
      }
    );
  
    if (!post)
      return res.status(404).send("The post with the given ID was not found.");
  
    res.send(post);
  });
  
  router.delete("/:id", [auth], async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id);
  
    if (!post)
      return res.status(404).send("The post with the given ID was not found.");
  
    res.send(post);
  });
module.exports = router; 
