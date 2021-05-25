const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}

const Subscription = {
  starter: 'starter',
  pro: 'pro',
  business: 'business',
}
module.exports = {
  HttpCode,
  Subscription,
}
