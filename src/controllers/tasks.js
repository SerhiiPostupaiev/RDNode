const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');
const { ObjectId } = require('mongodb');
class Tasks {
  static get(req, res, _id) {
    if (_id) {
      Tasks.getConcreteTask(req, res, _id);
    } else {
      Tasks.getAllTasks(req, res);
    }
  }

  static async getConcreteTask(req, res, _id) {
    try {
      const task = await Connection.db
        .collection('tasks')
        .findOne({ _id: new ObjectId(_id) });

      if (task === null) {
        return responseHelpers.payloadError(res, 'Task not found');
      }

      return responseHelpers.success(res, task);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async getAllTasks(req, res) {
    try {
      const tasks = await Connection.db.collection('tasks').find({}).toArray();

      return responseHelpers.success(res, tasks);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async post(req, res, _id, body) {
    const validation = Tasks.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
      const task = {
        title: body.title,
        text: body.text,
      };

      await Connection.db.collection('tasks').insertOne(task);
      return responseHelpers.success(res, task);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async put(req, res, _id, body) {
    const validation = Tasks.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
      const taskUpdated = {
        title: body.title,
        text: body.text,
      };

      const result = await Connection.db
        .collection('tasks')
        .updateOne({ _id: new ObjectId(_id) }, { $set: taskUpdated });

      if (result.modifiedCount === 0) {
        return responseHelpers.payloadError(
          res,
          'Task not found, nothing to update'
        );
      }

      taskUpdated._id = _id;

      return responseHelpers.success(res, taskUpdated);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async delete(req, res, _id) {
    try {
      const result = await Connection.db
        .collection('tasks')
        .deleteOne({ _id: new ObjectId(_id) });

      if (result.deletedCount === 0) {
        return responseHelpers.payloadError(
          res,
          'Task not found, nothing to delete'
        );
      }

      return responseHelpers.success(res, _id);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static paramsValidation(params) {
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
        errorText: 'Task text should not be longer than 60 characters',
      };
    }

    return { result: true };
  }
}

module.exports = { Tasks };
