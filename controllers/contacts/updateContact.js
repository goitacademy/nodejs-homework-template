const { Contact } = require('../../models/contact');

const { HttpError, ctrlWrapper } = require('../../helpers');

const updateContact = async (req, res) => {
    const id = req.params.contactId;
    const updatingContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatingContact) {
      throw HttpError(404, 'Not found');
    }
    res.json(updatingContact);
  };

module.exports = updateContact;