const { NotFound } = require('http-errors');

const contactsModule = require('../../models/contacts');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsModule.getContactById(contactId);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
