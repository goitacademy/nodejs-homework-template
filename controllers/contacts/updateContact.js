const createError = require("http-errors");
const {Contact} = require("../../models");

async function updateContact (req, res, next) {
      const {contactId} = req.params;
      const changedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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