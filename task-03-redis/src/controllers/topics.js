const responseHelpers = require('../response/methods');
const getRequest = require('../requests/get');
const { Connection } = require('../dbLayer/dbService');

class Topics {
  static async get(req, res, params) {
    const pageName = params.page;

    if (!params.page) {
      return responseHelpers.payloadError(
        res,
        'Topic name is not passed correctly'
      );
    }

    return Connection.client.get(pageName, async (err, metadata) => {
      if (err) {
        throw err;
      }

      if (metadata) {
        return responseHelpers.success(res, JSON.parse(metadata));
      } else {
        console.log('Getting the response...');
        const result = await getRequest(
          `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${params.page}`
        );
        Connection.client.setex(pageName, 3600, JSON.stringify(result));

        return responseHelpers.success(res, result);
      }
    });
  }
}

module.exports = { Topics };
