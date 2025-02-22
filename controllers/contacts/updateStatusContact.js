const mongoose = require("mongoose");
const { HttpError, ctrlWrapper } = require("../../helpers");
const Contact = require("../../models/contacts");
const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw HttpError(400, "Invalid Id");
  }
  // const contact = {
  //   favorite: req.body.favorite
  // }
  const contactOn = await Contact.findById(id);
  if (contactOn === null) {
    throw HttpError(404, "Not found");
  }
  if (contactOn.owner.toString() !== req.user.id.toString()) {
    throw HttpError(404, "Not found");
  }
  const newContact = await Contact.findByIdAndUpdate(id, contactOn, {
    new: true,
  });
  if (newContact) {
    return res.status(200).send(newContact);
  }
  throw HttpError(404, "Not found");
};
module.exports = {
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
