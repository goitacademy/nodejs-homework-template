const UserSubscription = {
  STARTER: 'starter',
  PRO: 'pro',
  BUSINESS: 'business',
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOF_FOUND: 404,
  CONFLICT: 409,
};

module.exports = { UserSubscription, HttpCode };
