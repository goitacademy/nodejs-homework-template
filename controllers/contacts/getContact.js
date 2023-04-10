const contactsController = require("../../models/contacts");

async function getContact(req, res, next) {
  try {
    const { id } = req.params;
    const contacts = await contactsController.getContactById(id);

    if (contacts === null) {
      const error = new Error("This contact is not found");
      error.code = 404;
      throw error;
    }

    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContact,
};
