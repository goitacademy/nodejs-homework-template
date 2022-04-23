const LIMIT_AGE = {
  min: 18,
  max: 60,
};

const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = { LIMIT_AGE, HTTP_STATUS_CODE };
export {};
