function getSuccesObject(data, code) {
  return {
    status: "succes",
    code,
    data,
  };
}

function getErrorObject() {
  return {
    status: HttpCode.NOT_FOUND,
    message: "Not found",
    data: "Not Found",
  };
}

module.exports = { getSuccesObject, getErrorObject };
