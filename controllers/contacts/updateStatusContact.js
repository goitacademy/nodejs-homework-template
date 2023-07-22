const Contact = require('../../models/contactModel');
const { userEditDataValidator } = require('../../utils');

exports.updateStatusContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    const { error, value } = userEditDataValidator.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'invalid data' });
    }

    const { favorite } = value;

    const updatedUser = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.sendStatus(500);
  }
};
