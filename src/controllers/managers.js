const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');

class Managers {
  static get() {}

  static async post(req, res, id, body) {
    const validation = Managers.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
      const manager = {
        fullName: body.fullName,
      };

      const addManagerQuery = `INSERT INTO Managers (fullName)
       VALUES (${manager.fullName})`;

      await Connection.client.query(addManagerQuery);
      return responseHelpers.success(res, manager);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static put() {}

  static delete() {}

  static paramsValidation(params) {
    if (params.fullName === '') {
      return {
        result: false,
        errorText: 'Full name is not given',
      };
    }

    if (!params.fullName) {
      return {
        result: false,
        errorText: 'Data is not provided',
      };
    }

    return { result: true };
  }
}

module.exports = { Managers };
