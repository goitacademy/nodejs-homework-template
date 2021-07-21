const { category: service } = require('../../services')

const getAll = async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { query } = req;
  try {
    const result = await service.getAll();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
}

module.exports = getAll;
