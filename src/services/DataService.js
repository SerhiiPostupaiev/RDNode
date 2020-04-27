const Director = require('../models/Director');
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');
const Shooting = require('../models/Shooting');

const { Connection } = require('../dbLayer/dbService');

class DataService {
  constructor() {
    this.synced = false;
    this.services = {
      Director,
      Genre,
      Movie,
      Shooting,
    };

    this.associateModels();
    this.synchronizeDB();
  }

  async addData(Service, data) {
    const response = await Service.create(data);

    return response;
  }

  synchronizeDB() {
    Connection.synchronize();
  }

  associateModels() {
    this.services.Director.hasMany(Movie, { onDelete: 'cascade' });

    this.services.Movie.belongsToMany(Genre, {
      through: Shooting,
    });
    this.services.Genre.belongsToMany(Movie, {
      through: Shooting,
    });
  }
}

const dataService = new DataService();
module.exports = { dataService };
