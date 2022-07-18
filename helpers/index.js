const createError = require("./errors/createError");
const { sgMailData, sendMail } = require("./sendMail/sendMail");

module.exports = {
  createError,
  sendMail,
  sgMailData,
};
