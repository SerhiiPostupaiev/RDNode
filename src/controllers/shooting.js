const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');

class Shooting {
  static get(req, res, id) {
    if (id) {
      Shooting.getConcreteShooting(req, res, id);
    } else {
      Shooting.getAllShootings(req, res);
    }
  }

  static async getConcreteShooting(req, res, id) {
    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async getAllShootings(req, res) {
    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async post(req, res, id, body) {
    const validation = Shooting.paramsValidation(body);

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
    const validation = Shooting.paramsValidation(body);

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

module.exports = { Shooting };
