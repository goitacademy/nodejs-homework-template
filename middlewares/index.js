const {
  checkContactId,
  checkCreateContactData,
  checkSameContact,
  checkStatusContactBody,
} = require("./contactsMiddlewares");

module.exports = {
  checkCreateContactData,
  checkContactId,
  checkSameContact,
  checkStatusContactBody,
};
