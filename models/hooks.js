export const handleSaveError = (error, data, next) => {
  console.log(error.code);
  console.log(error.name);
  const { code, name } = error;
  error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  next();
};

export const validateAtUpdate = function (next) {
  this.getOptions.runValidators = true;
  next();
};
