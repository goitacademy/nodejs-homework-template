const patternPhone = /^\+?3?8?(0\d{9})$/;
const emailConfigJoi = {
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
};

module.exports = {
  patternPhone,
  emailConfigJoi,
};
