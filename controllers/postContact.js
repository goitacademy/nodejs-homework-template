const { contactCreate } = require('../services');

const postContact = async (req, res, next) => {
  try {
    const result = await contactCreate(req.body);
    res.status(201).json({ status: 'Succsess', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;