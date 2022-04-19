const {getAllContacts, overwriteСontacts} = require('../utils');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contacts = await getAllContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId)
  if (idx === -1) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id= ${contactId} not found`
    })
  }
  
  contacts.splice(idx, 1)
  await overwriteСontacts(contacts)
  res.json({
      status: "success",
      code: 200,
      message: `Contact with id= ${contactId} deleted`
    })
}

module.exports = removeContact;