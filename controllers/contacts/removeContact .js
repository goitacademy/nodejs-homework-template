const { Contact } = require('../../models/contact');

const { HttpError, ctrlWrapper } = require('../../helpers');

const removeContact = async (req, res) => {
    const id = req.params.contactId;
    const removingContact = await Contact.findByIdAndRemove(id);
    if (!removingContact) {
      throw HttpError(404, 'Not found');
    }
    res.json({ message: 'Contact deleted' });
  };

module.exports = removeContact;