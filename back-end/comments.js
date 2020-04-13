const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  year: String,
  text: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);
//get comments
router.get("/:year", async (req, res) => {
  try {
    let comments = await Comment.find({
      year: req.params.year
    }).sort({
      created: -1
    }).populate('user');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// upload comment
router.post("/:year", validUser, async (req, res) => {
  const comment = new Comment({
    user: req.user,
    year: req.params.year,
    text: req.body.text,
  });
  try {
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//update comment
router.delete("/:year/:id", validUser, async (req, res) => {
  try {
      await Comment.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
//update comment
router.put("/:year/:id", validUser, async (req, res) => {
  try {
    comment = await Comment.findOne({
      _id: req.params.id
    });
    comment.text = req.body.text;
    await comment.save();
    return res.send({
      comment: comment
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}
