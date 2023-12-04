const Contact = require('../../models/contacts'); 

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findById(contactId);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = getContactById;
