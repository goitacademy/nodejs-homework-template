const mongoose = require("mongoose");
const { HttpError, ctrlWrapper } = require("../../helpers");
const Contact = require("../../models/contacts");
const getById = async (req, res) => {
  const id = req.params.contactId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw HttpError(400, "Invalid Id");
  }
  const contactOn = await Contact.findById(id);
  if (contactOn === null) {
    throw HttpError(404, "Not found");
  }
  if (contactOn.owner.toString() !== req.user.id.toString()) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).send(contactOn);
};
module.exports = { getById: ctrlWrapper(getById) };
