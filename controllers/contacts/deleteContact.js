const Contact = require("../../models/contact");
const { HttpError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} is not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
