const RequestError = require('../../helpers/requestError');
const service = require('../../services');

const getByID = async (req, res) => {
  const result = await service.getByID(req);

  if (!result) {
    throw RequestError(
      404,
      `contact with id: ${req.params.id} not found`
    );
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getByID;
