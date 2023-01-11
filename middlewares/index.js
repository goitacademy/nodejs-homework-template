const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const handlerSchemaValidatonErrors = require("./handlerSchemaValidatonErrors");
const isValideId = require("./isValidId");
const validationFavorite = require("./validationFavorite");
const auth = require("./auth");
const upload = require("./upload");
module.exports = {
  validation,
  validationFavorite,
  ctrlWrapper,
  isValideId,
  auth,
  handlerSchemaValidatonErrors,
  upload,
};
