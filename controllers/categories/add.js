const { category: service } = require('../../services')

const add = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await service.add(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) { next(error) };
}

module.exports = add;
