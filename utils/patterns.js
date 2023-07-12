/* eslint-disable no-useless-escape */
const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

module.exports = {PHONE_REGEX, EMAIL_REGEX}