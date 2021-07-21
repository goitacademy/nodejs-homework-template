const { Contact } = require('../../model');

const add = async (req, res, next) => {
  const { body } = req;
  res.json()
  try {
    const result = await Contact.create(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
};

module.exports = add;
