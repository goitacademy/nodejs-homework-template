const { model } = require("mongoose");

const handleSaveErrors = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MonfoServerError" && code === 11000 ? 409 : 400;
  next();
};

model.exports = handleSaveErrors;
