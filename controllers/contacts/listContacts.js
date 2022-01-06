const { Contact } = require("../../models/");

console.log(Contact);

async function listContacts(req, res) {
    const contacts = await Contact.find({});
    res.json({
      status: "Success",
      code: 200,
      data: {
        result: contacts
      }
    });
};

module.exports = listContacts;