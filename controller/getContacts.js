const service = require('../model/schemas');

const getContacts = async (req, res, next) => {
  try {
    const results = await service.getAllContact();
    res.json({
      status: 'success',
      code: 200,
      data: {
        tasks: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = getContacts;
