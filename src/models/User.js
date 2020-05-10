const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model('user', UserSchema);
