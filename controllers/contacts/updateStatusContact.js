const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw RequestError(404, "contact not found");
  }

  res.json(result);
};

module.exports = updateStatusContact;
