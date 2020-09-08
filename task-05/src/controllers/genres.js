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
      const response = await dataService.selectDataById(Genre, id);
      if (response.length === 0) {
        return responseHelpers.payloadError(res, 'Genre not found');
      }

      return responseHelpers.success(res, response);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async getAllGenres(req, res) {
    try {
      const response = await dataService.selectAllData(Genre);

      return responseHelpers.success(res, response);
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
      const genreFields = {
        title: body.title,
      };

      const response = await dataService.updateData(Genre, genreFields, id);
      if (response[0] === 0) {
        return responseHelpers.payloadError(
          res,
          'Genre not found, nothing to update'
        );
      }

      return responseHelpers.success(res, response);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async delete(req, res, id) {
    try {
      const response = await dataService.deleteData(Genre, id);
      if (response === 0) {
        return responseHelpers.payloadError(
          res,
          'Genre not found, nothing to delete'
        );
      }

      return responseHelpers.success(res, response);
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
