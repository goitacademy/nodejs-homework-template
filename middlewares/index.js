const validateBody = require("./validateBody");
const validateRegisterBody = require("./validateRegisterBody");
const auth = require("./auth");
const upload = require("./multer");

module.exports = {
  validateBody,
  validateRegisterBody,
  auth,
  upload,
};
