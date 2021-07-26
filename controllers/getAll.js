const { contact: service } = require('../service');

const listContact = async (req, res, next) => {
  const { query } = req;
  try {
    const result = await service.listContact(query);

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
