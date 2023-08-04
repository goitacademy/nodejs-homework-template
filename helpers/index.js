const HttpError = require("./HttpError");
const ctrlWraper = require("./ctrlWrapper");
const jimpResizer = require("./resizer");
<<<<<<< HEAD

const handleMongooseError = require("./handleMongooseError");

module.exports = { HttpError, ctrlWraper, handleMongooseError, jimpResizer };
=======
const sendEmail = require("./sendEmail");

const handleMongooseError = require("./handleMongooseError");

module.exports = {
  HttpError,
  ctrlWraper,
  handleMongooseError,
  jimpResizer,
  sendEmail,
};
>>>>>>> hw06-email
