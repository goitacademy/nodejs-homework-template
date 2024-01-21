export const handleSaveError = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

export const addUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
