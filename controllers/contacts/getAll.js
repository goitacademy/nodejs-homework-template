const services = require('../../services');

const getAll = async (req, res) => {
  const result = await services.getAll(req);

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
