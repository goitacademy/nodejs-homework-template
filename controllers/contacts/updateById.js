const { Contact } = require("../../models/contacts");
const { HttpErrors } = require("../../helpers");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpErrors(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContact;
