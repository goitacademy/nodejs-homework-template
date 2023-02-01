const service = require('../../services');

const add = async (req, res) => {
  const result = await service.add(req);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
