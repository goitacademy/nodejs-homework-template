
// const addError = (error, data, next) => {
//   error.status = 400;
//   next(error);
// };

// const updateError = (next) => {
//   this.options.runValidators = true;
//   next();
// }

// export default {
//   addError,
//   updateError,
// };

export const addError = (error, data, next) => {
  console.log(error.code);
  console.log(error.name);
  const { code, name } = error;
  error.status = (code === 11000 && name === "MongoServerError") ? 409 : 400;
  next();
  // error.status = 400;
  // next(error);
};

export const updateError = function(next){
  this.options.runValidators = true;
  next();
};