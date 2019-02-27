const {userSchema} = require('./user');
const Joi = require('joi');
const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({

  user: {
    type: userSchema,
    required: true
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
  });
  
  
  const Profile = mongoose.model('Profile', profileSchema);
  
  function validateProfile(profile) {
    const schema = {
        
    userId: Joi.objectId().required(),
      handle: Joi.string().max(40).required(),
      company: Joi.string(),
      website: Joi.string(),
      location: Joi.string(),
      status: Joi.string().required(),
      skills: Joi.array(),
      bio: Joi.string(),
      githubusername: Joi.string(),
      experience: Joi.array(),
      education: Joi.array(),
      social: Joi.object(),
      date: Joi.date(),
    };
  
    return Joi.validate(profile, schema);
  }
  
  exports.Profile = Profile; 
  exports.validate = validateProfile;
  exports.profileSchema = profileSchema;