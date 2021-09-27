const contacstOperations = require('../../model/contacts');

const updateById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contacstOperations.updateContact(id, req.body);
    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
};

module.exports = {

  updateById
};
