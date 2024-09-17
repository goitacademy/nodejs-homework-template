<<<<<<< HEAD
const RequestError = require('./RequestError');
const handleSaveErrors = require('./handleSaveErrors');

module.exports = {
    RequestError,
    handleSaveErrors,
=======
const HttpError = require("./HttpError");
const cntrlWrapper = require('../controllers/cntrlWrapper');
const handleMongooseError = require("./handleMongooseError");

module.exports = {
    HttpError,
    cntrlWrapper,
    handleMongooseError
<<<<<<< HEAD
=======
=======
const cntrlWrapper = require('./cntrlWrapper')

module.exports = {
    HttpError,
    cntrlWrapper
>>>>>>> master
>>>>>>> master
>>>>>>> master
}