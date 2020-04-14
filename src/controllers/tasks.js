const responseHelpers = require('../response/methods');

class Tasks {
  constructor() {}

  get(req, res, id) {
    if (id) {
      this.getConcreteTask(req, res, id);
    } else {
      this.getAllTasks(req, res);
    }
  }

  getConcreteTask(req, res, id) {
    try {
      const task = {
        id,
        title: 'ssdsd',
        text: 'dsddddd',
      };

      return responseHelpers.success(res, task);
    } catch (err) {
      return responseHelpers.error(res, err);
    }
  }

  getAllTasks(req, res) {
    try {
      const tasks = [
        {
          title: 'ssdsd',
          text: 'dsddddd',
        },
        {
          title: '123',
          text: 'dsddddd',
        },
        {
          title: 'ss6665566565dsd',
          text: 'dsddddd',
        },
      ];

      return responseHelpers.success(res, tasks);
    } catch (err) {
      return responseHelpers.error(res, err);
    }
  }

  post(req, res, id, body) {
    const validation = this.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText, 404);
    }

    try {
      return responseHelpers.success(res, body);
    } catch (err) {
      return responseHelpers.error(res, err);
    }
  }

  put(req, res, id, body) {
    const validation = this.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText, 404);
    }

    try {
      const task = {
        id,
        title: body.title,
        text: body.text,
      };
      return responseHelpers.success(res, task);
    } catch (err) {
      return responseHelpers.error(res, err);
    }
  }

  delete(req, res, id) {
    try {
      return responseHelpers.success(res, id);
    } catch (err) {
      return responseHelpers.error(res, err);
    }
  }

  paramsValidation(params) {
    if (params.text === '' || params.title === '') {
      return {
        result: false,
        errorText: 'Task text or title should not be empty',
      };
    }

    if (!(params.text && params.title)) {
      return {
        result: false,
        errorText: 'Data is not provided',
      };
    }

    if (params.text.length > 60) {
      return {
        result: false,
        errorText: 'Task text should not longer than 60 characters',
      };
    }

    return { result: true };
  }
}

const tasks = new Tasks();

module.exports = tasks;
