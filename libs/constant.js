const HTTP_STATUS_CODE = {
  // HttpCode
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const Role = {
  ADMIN: "admin",
  USER: "user",
};

module.exports = { Role, HTTP_STATUS_CODE };
