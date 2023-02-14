const service = require('../../services');

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await service.updateStatus(id, favorite);

  res.status(200).json({
    status: 'success',
    message: `Updated status of contact ${result.name} with id:${id}`,
    data: {
      result,
    },
  });
};

module.exports = updateStatus;
