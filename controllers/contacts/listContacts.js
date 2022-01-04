const contactOperations = require("../../model/contacts/");

async function listContacts(req, res) {
    const contacts = await contactOperations.listContacts();
    res.json({
      status: "Success",
      code: 200,
      data: {
        result: contacts
      }
    });
};

module.exports = listContacts;