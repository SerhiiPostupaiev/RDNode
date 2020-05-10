const mongoose = require('mongoose');
const dbConfigs = require('./dbConfig.json');

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfigs.mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
