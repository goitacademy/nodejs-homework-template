const { Contact } = require("../../models");
const { wrapper } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  
  await Contact.findByIdAndDelete(contactId);

  res.json({ message: "Contact deleted" });
};

module.exports = wrapper(removeContact);
