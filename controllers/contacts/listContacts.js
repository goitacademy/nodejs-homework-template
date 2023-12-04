const Contact = require('../../models/contacts'); 
const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); 

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = listContacts;
