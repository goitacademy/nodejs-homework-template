const Status = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};
const RareLimits = {
  WINDOW_MS: 1 * 60 * 1000,
  MAX_REQUESTS: 3,
  JSON_LIMIT: 10000,
};

module.exports = {
  Status,
  HttpCode,
  RareLimits,
};
