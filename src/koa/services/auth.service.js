const jwt = require('jsonwebtoken');

async function login(email, password, db) {
  try {

    const user = await db.User.findOne({ where: { email } });

    if (!user || !user.correctPassword(password)) {
      throw new Error('Invalid creds');
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );

    return {
      userId: user.id,
      token,
      tokenExpiration: 1
    };
  } catch (err) {
    throw new Error(err);
  }

}

async function signup(email, password, db) {
  return await db.User.create({ email, password });
}

module.exports = {
  login,
  signup
}