const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError({ status: 404 });
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = deleteById;
