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
  INTERNAL_SERVER_ERROR: 500,
};
const LIMIT_JSON = 5000;
const TIME_REQUEST_LIMIT = 15 * 60 * 1000;
const REQUEST_LIMIT = 2;

const phoneRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const emailRegex = /\S+@\S+\.\S+/;

const limitRegex = /\d+/;

const filterRegex =
  /[name|email|phone|favorite|createdAt|updatedAt}\\|?[name|email|phone|favorite|createdAt|updatedAt]+/;

module.exports = {
  HttpCode,
  LIMIT_JSON,
  TIME_REQUEST_LIMIT,
  REQUEST_LIMIT,
  phoneRegex,
  nameRegex,
  emailRegex,
  limitRegex,
  filterRegex,
};
