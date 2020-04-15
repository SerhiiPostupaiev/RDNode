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
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
  });
};
