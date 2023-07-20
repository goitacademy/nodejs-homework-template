const Contact = require('../../models/contactModel');
const { userEditDataValidator } = require('../../utils');

exports.updateContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const { error, value } = userEditDataValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'invalid data' });
    }

    const { name, email, phone } = value;

    if (name) {
      await Contact.findByIdAndUpdate(contactId, { name }, { new: true });
    }
    if (email) {
      await Contact.findByIdAndUpdate(contactId, { email }, { new: true });
    }
    if (phone) {
      await Contact.findByIdAndUpdate(contactId, { phone }, { new: true });
    }

    const updatedUserData = { name, email, phone };

    res.status(200).json(updatedUserData);
  } catch (error) {
    res.sendStatus(500);
  }
};
