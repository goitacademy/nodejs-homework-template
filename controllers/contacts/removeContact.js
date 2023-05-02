const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContact;
