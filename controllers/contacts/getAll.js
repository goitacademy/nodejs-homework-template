const operations = require('../../models/operations');

const getAllContacts = async (req, res, next) => {
  try {
    const result = await operations.getAll();
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

module.exports = getAllContacts;
