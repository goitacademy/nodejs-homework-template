const { Contact } = require("../../models");
const { httpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  if (!req.body) {
    throw httpError(400, "Missing field favorite");
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404, "Not found");
  }

  return res.status(200).json(result);
};

module.exports = updateStatusContact;
