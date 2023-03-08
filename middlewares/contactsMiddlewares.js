// const fs = require('fs').promises;

/*
 * Check new contact data.
 */
const checkContactData = (req, res, next) => {
  // You can write some validators here..

  console.log(req.body);

  next();
};

/*
 * Check contact id.
 */
const checkContactId = (req, res, next) => {
  console.log(req.params);

  next();
};

module.exports = {
  checkContactData,
  checkContactId,
};
