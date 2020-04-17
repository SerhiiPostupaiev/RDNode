const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');

class Documents {
  static get(req, res, id) {
    if (id) {
      Documents.getConcreteTask(req, res, id);
    } else {
      Documents.getAllTasks(req, res);
    }
  }

  static async getConcreteTask(req, res, id) {
    try {
      return responseHelpers.success(res, task);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async getAllTasks(req, res) {
    try {
      return responseHelpers.success(res, tasks);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static post(req, res, id, body) {
    const validation = Documents.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
      console.log(body);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static put() {}

  static delete() {}

  static paramsValidation(params) {
    if (params.content === '') {
      return {
        result: false,
        errorText: 'Document content should not be empty',
      };
    }

    if (!params.content) {
      return {
        result: false,
        errorText: 'Data is not provided',
      };
    }

    return { result: true };
  }
}

module.exports = { Documents };
