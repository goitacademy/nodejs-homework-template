const { Contact } = require("../../models/contact");

const { RequestError } = require("../../utils");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeById;
