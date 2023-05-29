const contactRemove = require('../services');

const delateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await contactRemove(contactId);
    res.status(200).json({ message: 'Contact deleted', status: 'Succsess' });
  } catch (error) {
    next(error);
  }
};

module.exports = delateContact;