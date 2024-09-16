const { contactUpdate } = require('../services');

const putContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactUpdate(contactId, req.body);

    res.status(200).json({ status: 'Succsess', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = putContact;