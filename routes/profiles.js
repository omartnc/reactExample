const auth = require('../middleware/auth');
const _ = require('lodash');
const {Profile, validate} = require('../models/Profile');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


router.get("/", [auth], async (req, res) => {
    const profiles = await Profile.find();
    res.send(profiles);
  });
  router.get("/:id", [auth], async (req, res) => {
    const profile = await Profile.findById(req.params.id);
  
    if (!profile)
      return res.status(404).send("The profile with the given ID was not found.");
  
    res.send(profile);
  });
  
  router.post("/", auth, async (req, res) => { 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user.');
  
    let profile = new Profile({
      user: user,
        handle: req.body.handle,
        company: req.body.company,
        website: req.body.website,
        location: req.body.location,
        status: req.body.status,
        skills: req.body.skills,
        bio: req.body.bio,
        githubusername: req.body.githubusername,
        experience: req.body.experience,
        education: req.body.education,
        social: req.body.social
    });
    profile = await profile.save();
  
    res.send(profile);
  });
  
  router.put("/:id", [auth], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid user.');
  
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        user: user,
        handle: req.body.handle,
        company: req.body.company,
        website: req.body.website,
        location: req.body.location,
        status: req.body.status,
        skills: req.body.skills,
        bio: req.body.bio,
        githubusername: req.body.githubusername,
        experience: req.body.experience,
        education: req.body.education,
        social: req.body.social
      },
      {
        new: true
      }
    );
  
    if (!profile)
      return res.status(404).send("The profile with the given ID was not found.");
  
    res.send(profile);
  });
  
  router.delete("/:id", [auth], async (req, res) => {
    const profile = await Profile.findByIdAndRemove(req.params.id);
  
    if (!profile)
      return res.status(404).send("The profile with the given ID was not found.");
  
    res.send(profile);
  });
module.exports = router; 
