const { Types } = require('mongoose');
const Contact = require('../../models/contactModel');

/** Перевірка ID перед запитом до сервера */
exports.checkUserById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    const idIsValid = Types.ObjectId.isValid(contactId);

    if (!idIsValid) {
      return res.status(404).json({ message: 'Not found' });
    }

    const contactExists = await Contact.exists({ _id: contactId });

    if (!contactExists) {
      return res.status(404).json({ message: 'Not found' });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};
