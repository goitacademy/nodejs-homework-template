const HttpSuccess = ({ code = 200, data, message = '' }) => {
  const result = {
    status: 'success',
    code,
    ...data,
  };
  if (message) {
    result.message = message;
  }
  return result;
};
module.exports = HttpSuccess;
