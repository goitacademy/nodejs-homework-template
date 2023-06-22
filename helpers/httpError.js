// const { HttpError } = require("../../helpers");
// throw HttpError(404, "404! Not found");

// const HttpError = (status, message) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

const HttpError = (error, data, next) => {
  const { name, code } = error;

  console.log(`name error`, name);
  console.log(`code error`, code);
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  console.log(`status`, status);

  error.status = status;
  // next();
};

module.exports = HttpError;
