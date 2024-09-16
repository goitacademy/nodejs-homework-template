const contacts = require("../../models/contacts");

const getContactById = async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

module.exports = { getContactById };