const {
  checkContactId,
  checkCreateContactData,
  checkSameContact,
} = require("./contactsMiddlewares");

module.exports = {
  checkCreateContactData,
  checkContactId,
  checkSameContact,
};
