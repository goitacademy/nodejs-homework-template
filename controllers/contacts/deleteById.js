const mongoose = require("mongoose");
const { HttpError, ctrlWrapper } = require("../../helpers");
const Contact = require("../../models/contacts");

const deleteById = async (req, res) => {
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
  const result = await Contact.findByIdAndDelete(id);
  if (result === null) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};
module.exports = { deleteById: ctrlWrapper(deleteById) };
