const { getAllContacts, overwriteСontacts } = require('../utils');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contacts = await getAllContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId)
  if (idx === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id= ${contactId} not found`
    })
  }

  const changeContact = {
    id: contactId,
    name,
    email,
    phone
  };

  contacts.splice(idx, 1, changeContact)
  
  await overwriteСontacts(contacts);  
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id= ${contactId} update`,
    data: {
      result: changeContact
    }
  })
}

module.exports = updateContact;