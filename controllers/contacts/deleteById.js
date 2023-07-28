const Contacts = require("../../models/contact");
const { HttpError } = require("../../helpers");

const deleteById = async (req, res) => {
  const id = req.params.id;
  const result = await Contacts.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};
module.exports = deleteById;
