const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.json({ message: "Delete success" });
};

module.exports = deleteContactById;