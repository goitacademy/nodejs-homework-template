const contacts = require("../../models/contacts");
const { RequesError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw RequesError(404, "Not found");
  }
  res.status(200).json({
    status: 200,
    message: "contact deleted",
  });
};

module.exports = removeById;
