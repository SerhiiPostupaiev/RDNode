const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/login', (req, res) => {
  res.redirect('/api/auth/google');
});

router.get('/logout', (req, res) => {
  req.logout();

  res.redirect('/api/home');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['openid', 'email', 'profile'],
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect(`/api/users/profile/${req.user._id}`);
});

module.exports = router;
