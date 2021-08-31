const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      contacts
    });
  }
  catch (error) {
    next(error)
  }
}

module.exports = getAllContacts;