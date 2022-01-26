const { Contact } = require("../../models");
const successRes = require("./successRes");
const throwNotFound = require("./throwNotFound");

async function getContactByIdController(req, res, next) {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      throwNotFound(contactId);
    }

    res.json(successRes(contact));
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 400;
    }
    next(error);
  }
}

module.exports = getContactByIdController;
