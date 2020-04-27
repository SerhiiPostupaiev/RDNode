const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');

class Movies {
  static get(req, res, id) {
    if (id) {
      Movies.getConcreteMovie(req, res, id);
    } else {
      Movies.getAllMovies(req, res);
    }
  }

  static async getConcreteMovie(req, res, id) {
    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async getAllMovies(req, res) {
    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async post(req, res, id, body) {
    const validation = Movies.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async put(req, res, id, body) {
    const validation = Movies.paramsValidation(body);

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
    if (params.name === '') {
      return {
        result: false,
        errorText: 'Name is not given',
      };
    }

    if (!params.director_id) {
      return {
        result: false,
        errorText: 'Director ID is not provided',
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

module.exports = { Movies };
