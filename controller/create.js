const service = require('../model/schemas');

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await service.createContact({ name, email, phone });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contacts: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = create;
