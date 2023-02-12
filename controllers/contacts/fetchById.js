const { NotFound } = require('http-errors');
const { getContactById } = require('../../models/contacts');

const fetchById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) throw new NotFound('Contact not found');

    res.json({
      success: true,
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = fetchById;
