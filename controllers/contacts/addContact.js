const contactsOperations = require("../../models");

async function addContact (req, res, next) {
      const newContact = await contactsOperations.addContact(req.body);
      res.status(201).json({
        status: "201",
        data: {
          newContact
        }
      })
  };

  module.exports = addContact;
