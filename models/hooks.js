const handleSaveError = (error, data, next) => {
  console.log("error:", error);
  error.status = 400;
  next();
};

function validateAtUpdate(next) {
  this.options.runValidators = true;
  next();
}

export default {
  handleSaveError,
  validateAtUpdate,
};
