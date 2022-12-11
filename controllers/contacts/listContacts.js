
const Contact = require("../../models/contacts");

const listContacts = async (req, res, next) => {
      const result = await Contact.find();
    res.json(result)
  
}

module.exports = listContacts;