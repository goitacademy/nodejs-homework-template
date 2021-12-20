const ValidLengthName = {
  MIN_LENGTH_NAME: 3,
  MAX_LENGTH_NAME: 30,
};

const ValidPassword = {
  MIN_PASSWORD: 7,
};


const StatusCode = {
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

const Subscription = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
};

const LimitSize = {
  FIELD_SIZE: 2000000,
  AvatarSize: 250,
};

const TransformAvatar = {
  SIZE_WIDTH: 250,
  SIZE_HEIGHT: 250,
};


module.exports = { StatusCode, ValidLengthName, Subscription, ValidPassword, LimitSize, TransformAvatar, };