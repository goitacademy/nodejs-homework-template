const Subscription = {
  FREE: 'free',
  PRO: 'pro',
  PREMIUM: 'premium',
}

const Owner = {
  USER: 'user',
}

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}

module.exports = { Subscription, Owner, HttpCode }
