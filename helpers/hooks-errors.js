
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
  error.status = 400;
  next(error);
};

export const updateError = function(next){
  this.options.runValidators = true;
  next();
};