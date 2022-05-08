const {Contact} = require("../../models");

async function addContact (req, res, next) {
      const newContact = await Contact.create(req.body);
      res.status(201).json({
        status: "201",
        data: {
          newContact
        }
      })
  };

  module.exports = addContact;
