const { Contact } = require('../../models/contacts');

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body: fields } = req;
  try {
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, fields, {
      new: true,
    });

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    res.json({
      status: 'Error',
      code: 404,
      message: 'Id not found',
    });
  }
};

module.exports = updateContact;
