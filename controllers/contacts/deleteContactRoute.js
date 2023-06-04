const { Contact } = require("../../models");
const { httpError } = require("../../helpers");
const { ctrlWrapper } = require("../../helpers");

const deleteContactRoute = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw httpError(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = ctrlWrapper(deleteContactRoute);
