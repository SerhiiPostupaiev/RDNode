const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');

class Managers {
  static get(req, res, id) {
    if (id) {
      Managers.getConcreteManager(req, res, id);
    } else {
      Managers.getAllManagers(req, res);
    }
  }

  static async getConcreteManager(req, res, id) {
    try {
      const getOneQuery = `SELECT * FROM Managers WHERE manager_id=${id}`;
      const { rows } = await Connection.client.query(getOneQuery);

      if (rows.length === 0) {
        return responseHelpers.payloadError(res, 'Manager not found');
      }

      return responseHelpers.success(res, rows);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async getAllManagers(req, res) {
    try {
      const getAllQuery = `SELECT * FROM Managers`;
      const { rows } = await Connection.client.query(getAllQuery);

      return responseHelpers.success(res, rows);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

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
       VALUES ('${manager.fullName}') RETURNING manager_id`;

      const { rows } = await Connection.client.query(addManagerQuery);

      manager.manager_id = rows[0].manager_id;
      return responseHelpers.success(res, manager);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async put(req, res, id, body) {
    const validation = Managers.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
      const manager = {
        manager_id: id,
        fullName: body.fullName,
      };

      const updateManagerQuery = `UPDATE Managers 
      SET fullName='${manager.fullName}'
      WHERE manager_id=${manager.manager_id}`;

      const { rowCount } = await Connection.client.query(updateManagerQuery);

      if (rowCount === 0) {
        return responseHelpers.payloadError(
          res,
          'Manager not found, nothing to update'
        );
      }

      return responseHelpers.success(res, manager);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async delete(req, res, id) {
    try {
      const deleteQuery = `UPDATE Documents 
      SET manager_id=NULL
      WHERE manager_id=${id};
      
      DELETE FROM Managers WHERE manager_id=${id};`;
      const { rowCount } = await Connection.client.query(deleteQuery);

      if (rowCount === 0) {
        return responseHelpers.payloadError(
          res,
          'Manager not found, nothing to delete'
        );
      }

      return responseHelpers.success(res, id);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

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
