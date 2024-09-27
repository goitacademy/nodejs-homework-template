const isBodyEmpty = require("./isBodyEmpty");
const isFavoriteEmpty = require("./isFavoriteEmpty")
const handleMongooseError = require("./handleMongooseError");
const isValidId = require("./isValidId");

module.exports = {
    isBodyEmpty,
    isFavoriteEmpty,
    handleMongooseError,
    isValidId,
}