const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteById;
