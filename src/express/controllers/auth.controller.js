const {
  login,
  signup
} = require('../services/auth.service');

async function loginController(req, res) {
  try {
    const result = await login(req.body.email, req.body.password, req.dbContext);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function signupController(req, res) {
  try {
    const result = await signup(req.body.email, req.body.password, req.dbContext);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = {
  loginController,
  signupController,
}
