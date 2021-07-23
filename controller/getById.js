const service = require('../service/schemas');

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.getContactsById(id);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = getById;
