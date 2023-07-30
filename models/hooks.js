export const handleMongooseError = (error, data, next) => {
  const { code, name } = error;
  error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  next();
};

export const handleUpdateValidate = function (next) {
  this.options.runValidators = true;
  next();
};
