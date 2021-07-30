const { Contact } = require('../../models/contacts');

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, body);

    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing field "favorite"',
      });
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'not found',
      code: 404,
      message: 'id not found',
    });
  }
};

module.exports = updateContactStatus;
