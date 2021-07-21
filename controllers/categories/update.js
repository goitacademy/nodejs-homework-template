const { category: service } = require('../../services');

const update = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const result = await service.update(id, body);
    res.status(200).json({
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

module.exports = update;
