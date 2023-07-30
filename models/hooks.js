export const handleSaveError = (error, _, next) => {
  const { status, name, code } = error;
  status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  next();
};

export const handleUpdateValidator = function (next) {
  this.options.runValidators = true;
  next();
};
