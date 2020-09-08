const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');

const { userService } = require('../services/userService');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userService.getUser(id, done);
});

passport.use(
  new googleStrategy(
    {
      callbackURL: '/api/auth/google/redirect',
      clientID: process.env.clientID,
      scope: 'https://www.googleapis.com/auth/plus.profile.emails.read',
      clientSecret: process.env.clientSecret,
      profileFields: ['emails'],
    },
    (accessToken, refreshToken, profile, done) => {
      userService.authUser(profile, done);
    }
  )
);
