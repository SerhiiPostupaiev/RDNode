const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');

class Documents {
  static get(req, res, id) {
    if (id) {
      Documents.getConcreteDocument(req, res, id);
    } else {
      Documents.getAllDocuments(req, res);
    }
  }

  static async getConcreteDocument(req, res, id) {
    try {
      const getOneQuery = `SELECT * FROM Documents WHERE document_id=${id}`;
      const { rows } = await Connection.client.query(getOneQuery);

      if (rows.length === 0) {
        return responseHelpers.payloadError(res, 'Document not found');
      }

      return responseHelpers.success(res, rows);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async getAllDocuments(req, res) {
    try {
      const joinAll = `SELECT * FROM Documents D FULL OUTER JOIN Managers M ON D.manager_id=M.manager_id WHERE D.document_id IS NOT NULL`;
      const getAllQuery = `SELECT * FROM Documents`;

      const { rows } = await Connection.client.query(joinAll);

      return responseHelpers.success(res, rows);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async post(req, res, id, body) {
    const validation = Documents.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
      const document = {
        content: body.content,
      };

      if (body.manager_id) {
        document.manager_id = body.manager_id;
      }

      const addDocumentQuery = `INSERT INTO Documents (content${
        document.manager_id ? ', manager_id' : ''
      })
       VALUES ('${document.content}'${
        document.manager_id ? ',' + document.manager_id : ''
      }) RETURNING document_id`;

      const { rows } = await Connection.client.query(addDocumentQuery);

      document.document_id = rows[0].document_id;
      return responseHelpers.success(res, document);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async put(req, res, id, body) {
    const validation = Documents.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
      const document = {
        document_id: id,
        content: body.content,
      };

      if (body.manager_id) {
        document.manager_id = body.manager_id;
      }

      const updateDocumentQuery = `UPDATE Documents 
      SET content='${document.content}'${
        document.manager_id ? ', manager_id=' + document.manager_id : ''
      }
      WHERE document_id=${document.document_id}`;

      const { rowCount } = await Connection.client.query(updateDocumentQuery);

      if (rowCount === 0) {
        return responseHelpers.payloadError(
          res,
          'Document not found, nothing to update'
        );
      }

      return responseHelpers.success(res, document);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async delete(req, res, id) {
    try {
      const deleteQuery = `DELETE FROM Documents WHERE document_id=${id}`;
      const { rowCount } = await Connection.client.query(deleteQuery);

      if (rowCount === 0) {
        return responseHelpers.payloadError(
          res,
          'Document not found, nothing to delete'
        );
      }

      return responseHelpers.success(res, id);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static paramsValidation(params) {
    if (params.manager_id === '') {
      return {
        result: false,
        errorText: 'Invalid manager ID provided',
      };
    }

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
