const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');

class Directors {
  static get(req, res, id) {
    if (id) {
      Directors.getConcreteDirector(req, res, id);
    } else {
      Directors.getAllDirectors(req, res);
    }
  }

  static async getConcreteDirector(req, res, id) {
    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async getAllDirectors(req, res) {
    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async post(req, res, id, body) {
    const validation = Directors.paramsValidation(body);

    if (!validation.result) {
      const director = {
        firstName: body.firstName,
        lastName: body.lastName,
        birthYear: body.birthYear,
      };
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async put(req, res, id, body) {
    const validation = Directors.paramsValidation(body);

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
    if (params.lastName === '' || params.firstName === '') {
      return {
        result: false,
        errorText: "Director's personal data is required",
      };
    }

    if (!params.birthYear) {
      return {
        result: false,
        errorText: 'Year of birth is required',
      };
    }

    if (params.birthYear.toString().length !== 4 && params.birthYear < 1900) {
      return {
        result: false,
        errorText: 'Year of birth is not valid',
      };
    }

    if (!(params.lastName && params.firstName)) {
      return {
        result: false,
        errorText: "Director's personal data is required",
      };
    }

    return { result: true };
  }
}

module.exports = { Directors };
