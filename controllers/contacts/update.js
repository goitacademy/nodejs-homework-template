const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const update = async (req, res) => {
  const { contactId } = req.params;
  const newContact = await Contact.findOneAndUpdate(contactId, req.body);
  if (!newContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data: newContact });
};

const updateStatusContact = async (req, res) => {
  if (req.body.favorite === undefined) {
    throw HttpError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: req.body.favorite },
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data: updatedContact });
};

module.exports = {
  update: ctrlWrapper(update),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
