const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNATHORIZED: 401,
  FORBIDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}

const UserStatus = {
  FREE: 'free',
  PRO: 'pro',
  PREMIUM: 'premium',
}

module.exports = { HttpCode, UserStatus }
