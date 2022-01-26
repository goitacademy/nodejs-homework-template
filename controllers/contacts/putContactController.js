const { Contact } = require("../../models");
const successRes = require("./successRes");
const throwNotFound = require("./throwNotFound");

async function putContactController(req, res, next) {
  try {
    const { contactId } = req.params;

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      throwNotFound(contactId);
    }

    res.json(successRes(updatedContact));
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 400;
    }
    next(error);
  }
}

module.exports = putContactController;
