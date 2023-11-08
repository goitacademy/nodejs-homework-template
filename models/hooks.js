const handleSaveError = (error, data, next) => {
  const { username, code } = error;

  error.status = username === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

const runValidatorsAtUpdate = function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};

module.exports = { handleSaveError, runValidatorsAtUpdate };
