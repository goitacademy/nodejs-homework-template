const { Contact } = require('../../models');

const add = async (req, res, next) => {
  try {
    const { body, user } = req;

    const result = await Contact.create({ ...body, owner: user._id });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
