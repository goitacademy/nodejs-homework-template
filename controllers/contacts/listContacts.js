const { contact: service } = require('../../services');

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const result = await service.listContacts(userId);
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
