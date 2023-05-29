const validateBody = require("./validateBody")
const isValidId = require('../middlewares/isValidId');
const validateFavourite = require('../middlewares/validateFavourite')

module.exports = {
    validateBody,
    isValidId,
    validateFavourite
}