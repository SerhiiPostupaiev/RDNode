const https = require('https');

module.exports = function (url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        try {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk.toString();
          });

          res.on('end', () => {
            resolve(JSON.parse(data));
          });
        } catch (err) {
          reject(err);
        }
      })
      .on('error', (err) => {
        console.error(err.message);
      });
  });
};
