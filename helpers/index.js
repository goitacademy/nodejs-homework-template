const ctrlWrapper = require("./ctrlWrapper");
const generateHTTPError = require("./generateHTTPError");
const contactsHandlers = require("./contactsHandlers");
const resizeFile = require("./handleFiles");

module.exports = {
  ctrlWrapper,
  generateHTTPError,
  contactsHandlers,
  resizeFile,
};
