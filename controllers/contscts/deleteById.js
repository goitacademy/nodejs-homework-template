const contacts = require("../../models/contacts");
const { RequestError } = require("../../utils");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteById;
