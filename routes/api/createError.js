const { message } = require("../../middlewares/schemaBody");
const ERROR_TYPE = require("./errorType");

const createError = (data,err='') => ({...ERROR_TYPE[data], message: err});
module.exports = createError;