const express = require('express');
const router = express.Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/api/auth/login');
  } else {
    next();
  }
};

router.get('/profile/:id', authCheck, (req, res) => {
  res.render('index', {
    result: {
      name: req.user.name,
      surname: req.user.surname,
      logged: true,
    },
  });
});

module.exports = router;
