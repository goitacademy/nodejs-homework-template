const { Contact } = require("../schemas/contacts");
const { RequestError } = require("../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = removeById;
