const mongoose = require("mongoose");
const { HttpError, ctrlWrapper } = require("../../helpers");
const Contact = require("../../models/contacts");
const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const contactNew = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: !req.body.favorite,
  };
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw HttpError(400, "Invalid Id");
  }
  const newContact = await Contact.findByIdAndUpdate(id, contactNew, {
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
