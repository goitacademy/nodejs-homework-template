const Subscription = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
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
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const Statuses = {
  success: "success",
  error: "error",
  fail: "fail",
};

const Limits = {
  JSON: 10000,
  tokenLife: "3h",
  imageSize: 2000000,
};

const Port = {
  default: 3000,
};

const apiLimitsConfig = {
  windowMs: 9000000, // 15 minutes: time limit for requests
  max: 100, // limit for possible requests number
  handler: (req, res, next) => {
    return res.status(HttpCodes.TOO_MANY_REQUESTS).json({
      status: Statuses.error,
      code: HttpCodes.TOO_MANY_REQUESTS,
      message: "Too many requrests made. Please try again later.",
    });
  },
};

module.exports = {
  Subscription,
  HttpCodes,
  Statuses,
  Limits,
  Port,
  apiLimitsConfig,
};
