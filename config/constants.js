const ValidLengthContactName = {
  MIN_LENGTH_NAME: 3,
  MAX_LENGTH_NAME: 30,
};

const Subscription = {
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

const Limit = {
  JSON: 10000,
  WINDOW_MS: 15 * 60 * 1000,
  MAX_LIMITER: 3,
};

module.exports = {
  ValidLengthContactName,
  Subscription,
  HttpCode,
  Limit,
};
