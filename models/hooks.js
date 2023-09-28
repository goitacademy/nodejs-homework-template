export const hookError = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

export const runValidateAtUpdate = (next) => {
  this.options.runValidators = true;
  next();
};
