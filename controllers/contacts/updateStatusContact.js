
const createError = require('http-errors');

const { Contact } = require('../../models');

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: req.body.favorite },
    {
      new: true,
      timestamps: true,
    }
  );

  if (!updatedContact) {
    throw createError(404, `Contact with id=${contactId} was not found`);
  }

  res.json(updatedContact);
};

module.exports = updateStatusContact;