const { updateContactSchema } = require('../../validation/validation');
const Contact = require('../../models/contacts'); 

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { error } = updateContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: { "message": "missing fields" } });
  }
  try {
    const updatedContact = {
      ...req.body,
    };

    const contact = await Contact.findOneAndUpdate(
      { _id: contactId },
      updatedContact,
      { new: true } 
    );

    if (contact) {
      res.status(200).json({ message: 'Contact updated successfully', data: contact });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = updateContact;
