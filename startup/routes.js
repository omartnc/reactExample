const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const profile = require("../routes/profiles");
const profile = require("../routes/profiles");
const post = require("../routes/posts");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/profiles", profile);
  app.use("/api/posts", post);
  app.use(error);
};
