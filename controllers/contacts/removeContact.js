const createError = require("http-errors");
const contactsOperations = require("../../models");

async function removeContact (req, res, next) {
      const {contactId} = req.params;
      const deletedContact = await contactsOperations.removeContact(contactId);
      if(!deletedContact) {
        throw createError(404, `Contact with id=${contactId} not found`);
      }
      res.json({
        status: "200",
        message: "Contact deleted",
        data: deletedContact
      });
};

module.exports = removeContact;