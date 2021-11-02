const ValidContactName = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 30,
};

const Subscription = {
  STARTER: 'starter',
  PRO: 'pro',
  BUSINESS: 'business',
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

const ResponseStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
};

module.exports = {
  ValidContactName,
  Subscription,
  HttpCode,
  ResponseStatus,
};
