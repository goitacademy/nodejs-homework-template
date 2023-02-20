const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw RequestError(404);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: {
      result,
    },
  });
};

module.exports = remove;
