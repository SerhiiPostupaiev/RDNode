const { MongoClient } = require('mongodb');
const dbConfigs = require('./dbConfigs.json');

class Connection {
  static async connectToMongoDB() {
    if (!this.db) {
      this.db = await MongoClient.connect(this.dbUri, this.options);
      this.db = await this.db.db('tasks-db');
    }

    console.log('MongoDB connected!');
  }
}

Connection.db = null;
Connection.dbUri = dbConfigs.mongoURI;
Connection.options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = { Connection };
