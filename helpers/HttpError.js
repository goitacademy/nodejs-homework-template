const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

module.exports = HttpError;



// example

// const errorMessagelist = {
//   400:"missing fields",
//   401:"Not authorized",
//   403:"Forbidden",
//   404:"No gound",
//   409:"Conflict",
// }

// const HttpError = (status, message = errorMessagelist[status]) => {
//   const error = new Error(message);
//   error.status = status;

//   return error;
// };

// module.exports = HttpError;