const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');
const Director = require('../models/Director');
const { dataService } = require('../services/DataService');

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
      const response = await dataService.selectDataById(Director, id);

      if (response.length === 0) {
        return responseHelpers.payloadError(res, 'Director not found');
      }

      return responseHelpers.success(res, response);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async getAllDirectors(req, res) {
    try {
      const response = await dataService.selectAllData(Director);

      return responseHelpers.success(res, response);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async post(req, res, id, body) {
    const validation = Directors.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
      const directorFields = {
        firstName: body.firstName,
        lastName: body.lastName,
        birthYear: body.birthYear,
      };

      const response = await dataService.addData(Director, directorFields);

      return responseHelpers.success(res, response);
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
      const directorFields = {
        firstName: body.firstName,
        lastName: body.lastName,
        birthYear: body.birthYear,
      };

      const response = await dataService.updateData(
        Director,
        directorFields,
        id
      );
      if (response[0] === 0) {
        return responseHelpers.payloadError(
          res,
          'Director not found, nothing to update'
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
      const response = await dataService.deleteData(Director, id);

      if (response === 0) {
        return responseHelpers.payloadError(
          res,
          'Director not found, nothing to delete'
        );
      }

      return responseHelpers.success(res, response);
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

    if (params.birthYear.toString().length !== 4 || params.birthYear < 1900) {
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
