const express = require('express');
const router = express.Router();
const Post = require('./../models/Post.model');
/* GET home page */
router.get('/', (req, res) => {
  Post.find()
    .populate('creator')
    .then(posts => {
      res.render('index', { post: posts, title: 'App created with Ironhack generator 🚀' });
    });
});

module.exports = router;
