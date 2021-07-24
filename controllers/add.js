const { contact: service } = require('../service');

const addContact = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await service.addContact(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next();
  }
};

module.exports = addContact;
