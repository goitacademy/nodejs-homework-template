const { Contact } = require("../../models");
const successRes = require("../../utils/successRes");
const throwNotFound = require("./throwNotFound");

async function deleteContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;

    const deletedContact = await Contact.findOneAndRemove({
      owner: _id,
      _id: contactId,
    });
    ``;

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
