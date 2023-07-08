const { Contact } = require("../../models/contact");

const { HttpErr } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpErr(404, "Not found!");
  }
  res.json({
    message: "Delete success!",
  });
};

module.exports = removeContact;
