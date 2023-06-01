const { contactFind } = require('../services');

const getOneContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactFind(contactId);

    res.status(200).json({ status: 'Succsess', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = getOneContact;