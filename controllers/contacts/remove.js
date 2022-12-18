const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete Success" });
};
module.exports = remove;
