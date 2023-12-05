const { Contact } = require("../../models/contact");
const {HttpError, ctrlWrapper} = require("../../helpers/index");


const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  // const existingContact = await Contact.findById(contactId);
  const existingContact = await Contact.findOne({ _id: contactId, owner });

  if (!existingContact) {
    throw HttpError(404, "Contact was not found");
  }

  if (!req.body.favorite) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  
  // const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true });
  
  res.status(200).send(result);
};


module.exports = {
  updateFavoriteById: ctrlWrapper(updateFavoriteById)
};