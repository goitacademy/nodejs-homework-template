
const { Contact } = require("../../models/contact");

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  //if (!result) throw HttpError(404);
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContactById;