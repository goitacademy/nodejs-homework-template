export const saveError = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = 400;
  next();
};
export const preUpdate = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
