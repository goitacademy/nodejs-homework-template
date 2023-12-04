const Contact = require('../../models/contacts'); 

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findOneAndDelete({ _id: contactId });

    if (contact) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = removeContact;
