const createError = require("http-errors");
const contactsOperations = require("../../models");

async function updateContact (req, res, next) {
      const {contactId} = req.params;
      const changedContact = await contactsOperations.updateContact({id: contactId, changedContact: req.body});
      if(!changedContact) {
        throw createError(404, "Not found");
      };
      res.json({
        status: "200",
        data: {
          changedContact
        }
      });
  };

  module.exports = updateContact;