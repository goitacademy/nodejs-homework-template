const { Contact } = require('../../models');

const add = async (req, res, next) => {
  try {
    const { body } = req;

    const result = await Contact.create(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
