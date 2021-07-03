const path = require('path')

const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  NO_CONTENT: 204,
  INTERNAL_SERVER_ERROR: 500,
}

const SUBSCRIPTION = {
  STARTER: 'starter',
  PRO: 'pro',
  BUSINESS: 'business',
}

const IMAGE_DIR = path.join(process.cwd(), 'public', 'avatars')

const PUBLIC_DIR = path.join(process.cwd(), 'public')

const SALT_FACTOR = 10

module.exports = {
  HTTP_CODE,
  SUBSCRIPTION,
  SALT_FACTOR,
  IMAGE_DIR,
  PUBLIC_DIR,
}
