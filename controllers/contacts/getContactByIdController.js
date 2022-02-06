const { Contact } = require("../../models");
const successRes = require("../../utils/successRes");
const throwNotFound = require("./throwNotFound");

async function getContactByIdController(req, res, next) {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;

    const contact = await Contact.findOne({
      owner: _id,
      _id: contactId,
    }).populate("owner", "_id email");

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
