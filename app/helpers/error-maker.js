const getError = (data, statusCode) => {
  const err = new Error();
  if (data instanceof Error) err.message = data.message;
  else err.message = data;
  if (statusCode) err.statusCode = statusCode;
  else err.statusCode = getStatus(err.message);
  return err;
};

global.getError = getError;
module.exports = getError;
