const service = require('../service');

const listContact = async (req, res, next) => {
  try {
    const result = await service.getAll();

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

module.exports = listContact;
