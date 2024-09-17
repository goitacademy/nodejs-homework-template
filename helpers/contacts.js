const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

const STATUS = {
  ERROR: 'error',
  SUCCESS: 'success',
  FAIL: 'fail',
}

module.exports = { HTTP_CODES, STATUS }