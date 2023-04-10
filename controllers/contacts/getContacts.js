const contactsController = require("../../models/contacts");

async function getContacts(req, res, next) {
  try {
    const contacts = await contactsController.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContacts,
};
