const Contact = require('../../models/contacts');

const updateFavoriteStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== 'boolean') {
    return res.status(400).json({ error: { message: 'missing field favorite' } });
  }

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId },
      { favorite: favorite },
      { new: true } 
    );

    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      return res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = updateFavoriteStatus;
