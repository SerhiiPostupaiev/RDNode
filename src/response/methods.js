module.exports.payloadError = (res, error = 'Data provided is not valid') => {
  setHeaders(res);

  res.statusCode = 400;

  res.end(
    JSON.stringify({
      status: 'fail',
      error,
    })
  );
};

module.exports.error = (res, error = 'Server Error', statusCode = 500) => {
  setHeaders(res);

  res.statusCode = statusCode;

  res.end(
    JSON.stringify({
      status: 'fail',
      error,
    })
  );
};

module.exports.success = (res, data = null) => {
  setHeaders(res);

  res.statusCode = 200;

  res.end(
    JSON.stringify({
      status: 'success',
      data,
    })
  );
};

const setHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Content-Type', 'application/json');
};
