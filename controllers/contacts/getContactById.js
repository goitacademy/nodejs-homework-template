const { Contact } = require("../../models/contact");

const { HttpErr } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpErr(404, "Not found!");
  }
  res.status(200).json(result);
};

module.exports = getContactById;
