const { contact: service } = require('../../services');

const listContacts = async (req, res, next) => {
  const { query } = req;
  try {
    const result = await service.listContacts(query);

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

module.exports = listContacts;
