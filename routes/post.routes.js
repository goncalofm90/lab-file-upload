const express = require('express');

//const User = require('../models/User.model');
const Post = require('../models/Post.model');

const routeGuard = require('../configs/route-guard.config');

const postRouter = new express.Router();

postRouter.get('/create', routeGuard, (req, res) => {
  res.render('post/create');
});

postRouter.post('/create', routeGuard, (req, res, next) => {
  const { content } = req.body;

  Post.create({
    content,
    creator: req.session.currentUser._id
  })
    .then(post => {
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    });
});

postRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Post.findById(id)
    .populate('creator')
    .then(data => {
      console.log(data);
      res.render('post/detailed', { post: data });
    });
});

module.exports = postRouter;
