const httpError = require('http-errors');
const service = require('../../services');

const removeById = async (req, res) => {
  const { id } = req.params;

  const result = await service.removeById(id);
  if (!result) {
    throw httpError(
      404,
      `contact with id:${id} ALREADY deleted`
    );
  }

  res.json({
    status: 'success',
    code: 200,
    message: `contact with id:${id} deleted`,
    data: {
      result,
    },
  });
};

module.exports = removeById;
