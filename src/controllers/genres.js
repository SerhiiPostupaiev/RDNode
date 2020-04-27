const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');
const { dataService } = require('../services/DataService');
const Genre = require('../models/Genre');

class Genres {
  static get(req, res, id) {
    if (id) {
      Genres.getConcreteGenre(req, res, id);
    } else {
      Genres.getAllGenres(req, res);
    }
  }

  static async getConcreteGenre(req, res, id) {
    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async getAllGenres(req, res) {
    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async post(req, res, id, body) {
    const validation = Genres.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
      const genreFields = {
        title: body.title,
      };

      const response = await dataService.addData(Genre, genreFields);

      return responseHelpers.success(res, response);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async put(req, res, id, body) {
    const validation = Genres.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
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

  static paramsValidation(params) {
    if (params.title === '') {
      return {
        result: false,
        errorText: 'Title is not given',
      };
    }

    if (!params.title) {
      return {
        result: false,
        errorText: 'Data is not provided',
      };
    }

    return { result: true };
  }
}

module.exports = { Genres };
