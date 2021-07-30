const { Contact } = require('../../models/contacts');

const getAll = async (_req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json({
      status: 'succsess',
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
