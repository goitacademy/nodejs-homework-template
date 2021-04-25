const { HttpCode } = require("../helpers/constants");

function getSuccesObject(data, code) {
  return {
    status: "succes",
    code,
    data,
  };
}

function getErrorObject(
  code = HttpCode.NOT_FOUND,
  data = "Not found",
  message = "Not found"
) {
  return {
    status: code,
    data,
    message,
  };
}

module.exports = { getSuccesObject, getErrorObject };
