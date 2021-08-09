const { contact: service } = require('../../services');

const listContacts = async (req, res, next) => {
  const userId = req.user.id;
  const query = req.query;
  try {
    const result = await service.listContacts(userId, query);
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
