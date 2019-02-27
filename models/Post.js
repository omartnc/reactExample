const {userSchema} = require('./user');
const Joi = require('joi');
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

  user: {
    type: userSchema,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  likes: [
    {
        user: {
            type: userSchema,
            required: true
          }
    }
  ],
  comments: [
    {
        user: {
            type: userSchema,
            required: true
          },
          text:{
              type:String,
              required:true
          },
           name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
          },
          date:{
              type:Date,
              default:Date.now
          }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
  });
  
  
  const Post = mongoose.model('Post', postSchema);
  
  function validatepost(post) {
    const schema = {
        
    userId: Joi.objectId().required(),
      text: Joi.string().required(),
      name: Joi.string(),
      likes: Joi.array(),
      comments: Joi.array(),
      date: Joi.date(),
    };
  
    return Joi.validate(post, schema);
  }
  
  exports.Post = Post; 
  exports.validate = validatepost;
  exports.postSchema = postSchema;