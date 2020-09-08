const jwt = require('jsonwebtoken');

const handleUnauthorized = function (res) {
  res.sendStatus(401);
};

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return handleUnauthorized(res);
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return handleUnauthorized(res);
  }

  if (!decodedToken) {
    return handleUnauthorized(res);
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
