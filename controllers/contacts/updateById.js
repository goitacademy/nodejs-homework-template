const contactsOptions = require('../../models/contacts');
const createError = require('http-errors');

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOptions.updateContact(id, req.body);
    if (!result) {
      throw createError(404, `Product with ID: ${id} not found`);
    }
    res.json({
      status: 'succes',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
