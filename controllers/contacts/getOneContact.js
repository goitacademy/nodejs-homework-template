const { Contact } = require('../../models/contacts');

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findOne({ _id: contactId });

    res.status(200).json({
      status: 'sucsess',
      code: 200,
      data: { result },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Error',
      code: 404,
      message: 'ID not found',
    });
  }
};

module.exports = getContactById;
