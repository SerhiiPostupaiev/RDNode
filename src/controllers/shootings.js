const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');
const { dataService } = require('../services/DataService');
const Shooting = require('../models/Shooting');

class Shootings {
  static get(req, res) {
    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async post(req, res, id, body) {
    try {
      const shootingFields = {
        movieId: body.movieId,
        genreId: body.genreId,
      };
      const response = await dataService.addData(Shooting, shootingFields);

      return responseHelpers.success(res, response);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async delete(req, res, id) {
    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }
}

module.exports = { Shootings };
