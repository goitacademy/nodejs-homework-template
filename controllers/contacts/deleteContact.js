const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.params);
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndDelete({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = deleteContact;
