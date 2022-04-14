const Subscription = {
    STARTER: 'starter',
    PRO: 'pro',
    BUSINESS: 'business',
  };
  
  const HttpCodes = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MAY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
  };
  
  const Limits = {
    JSON: 10000,
  };
  
  module.exports = { Subscription, HttpCodes, Limits };