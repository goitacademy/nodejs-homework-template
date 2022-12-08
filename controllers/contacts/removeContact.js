const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    res.status(404).json(`Not found`);
  }
  res.status(200).json({
    result,
    message: `Contact deleted`,
  });
};

module.exports = removeContact;
