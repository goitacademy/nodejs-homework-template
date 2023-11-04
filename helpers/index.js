const path = require("path");

const HttpErrorPath = path.join(__dirname, "HttpError.js");

const HttpError = require(HttpErrorPath);

module.exports = {
  HttpError,
};
