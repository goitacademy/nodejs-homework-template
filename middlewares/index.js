const { validate, validateFavorite } = require("./validate");
const idValidate = require("./idValidate");
const auth = require("./auth");

module.exports = { idValidate, validate, validateFavorite, auth };