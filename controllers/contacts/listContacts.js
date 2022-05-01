const contactsOperations = require("../../models");

async function listContacts (req, res, next) {
    const contacts = await contactsOperations.listContacts();
    return res.json({
      status: "200",
      data: {
        result: contacts
      }
    });
};

module.exports = listContacts;