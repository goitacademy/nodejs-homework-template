const setApiErrorStatus = require("./setApiErrorStatus");

const handleMongooseError = (error, doc, next) => {
  const { name, code, message, keyValue } = error;

  error.status = name === "MongoError" && code === 11000 ? 409 : 400;

  if (message.includes("duplicate") && keyValue.email) {
    next(setApiErrorStatus(409, `Email - "${keyValue.email}" in use`));
  }

  if (message.includes("password")) {
    next(setApiErrorStatus(400, "The password must consist of Latin letters (A-z), Arabic numerals (0-9) and special characters, the literal part of the password must contain both lowercase and uppercase letters, the length of the password must be at least 8 and no more than 16 characters"));
  }

  next();
};

module.exports = handleMongooseError;