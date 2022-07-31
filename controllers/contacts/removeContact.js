const { basedir } = global;
const { Contact } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/helpers`);

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw createError(404);
  }

  res.json({
    message: "Contact deleted"
  })
}

module.exports = removeContact;