export const handleSaveError = (error, data, next) => {
  const { name, code } = error;

  error.status = name === "MongoServerError" && code === 11000 ? 409 : 406;
  
  next();
};

export const preUpdate = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
