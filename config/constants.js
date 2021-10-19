const ValidName = {
  MIN_LENGTH_NAME: 3,
  MAX_LENGTH_NAME: 30,
}

const StatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}

module.exports = { StatusCode, ValidName }
