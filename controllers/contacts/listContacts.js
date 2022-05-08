const {Contact} = require("../../models");

async function listContacts (req, res, next) {
    const contacts = await Contact.find({});
    return res.json({
      status: "200",
      data: {
        result: contacts
      }
    });
};

module.exports = listContacts;