const { httpError, ctrlWrapper} = require("../../helpers");
const {
  ContactModel: { Contact },
} = require("../../models");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  removeContact: ctrlWrapper(removeContact),
}; 
