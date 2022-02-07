const { Contact } = require("../../models");
const successRes = require("../../utils/successRes");
const throwNotFound = require("./throwNotFound");

async function updateFavoriteCtrl(req, res, next) {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;

    const updatedContact = await Contact.findOneAndUpdate(
      {
        owner: _id,
        _id: contactId,
      },
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

module.exports = updateFavoriteCtrl;
