const { NotFound } = require('http-errors');
const service = require('../../services');

const removeById = async (req, res) => {
  const { id } = req.params;

  const result = await service.removeById(id);
  if (!result) {
    throw NotFound(`Contact with id:${id} not found`);
  }

  res.status(200).json({
    status: 'success',
    message: `Contact with id:${id} deleted`,
    data: {
      result,
    },
  });
};

module.exports = removeById;
