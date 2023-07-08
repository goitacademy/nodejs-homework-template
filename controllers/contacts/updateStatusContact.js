const { Contact } = require("../../models/contact");

const { HttpErr } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!req.body) {
    throw HttpErr(400, "Missing field favorite");
  }
  if (!result) {
    throw HttpErr(404, "Not found!");
  }
  res.json(result);
};
module.exports = updateStatusContact;
