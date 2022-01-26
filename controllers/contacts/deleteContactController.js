const { Contact } = require("../../models");
const successRes = require("./successRes");
const throwNotFound = require("./throwNotFound");

async function deleteContactController(req, res, next) {
  try {
    const { contactId } = req.params;

    const deletedContact = await Contact.findByIdAndRemove(contactId);

    if (!deletedContact) {
      throwNotFound(contactId);
    }

    res.json(successRes(deletedContact));
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 400;
    }
    next(error);
  }
}

module.exports = deleteContactController;
