const contactsOptions = require('../../models/contacts');
const createError = require('http-errors');

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOptions.getContactById(id);
    if (!result) {
      throw createError(404, `Product with ID: ${id} not found`);
    }
    res.status(200).json({
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

module.exports = getById;
