const { GeneralService } = require('./generalService');
const User = require('../models/User');

class UserService extends GeneralService {
  constructor() {
    super();
  }

  async authUser(profile, done) {
    const {
      id,
      name: { familyName, givenName },
    } = profile;

    try {
      let user = await User.findOne({ googleId: id });

      if (!user) {
        user = new User({ googleId: id, surname: familyName, name: givenName });

        await user.save();
      }

      done(null, user);
    } catch (err) {
      console.error(err.msg);
    }
  }

  async getUser(id, done) {
    let user = await User.findById(id);

    done(null, user);
  }
}

const userService = new UserService();
module.exports = { userService };
