const { Contact } = require("../../models/contacts.js");
const { RequestError } = require("../../helpers/index.js");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  } else if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing field favorite" });
  } else {
    res.status(200).json(result);
  }
};

module.exports = updateStatusContact;
