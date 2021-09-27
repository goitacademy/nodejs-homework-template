const contacstOperations = require('../../model/contacts');

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contacstOperations.getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ contact, message: 'Success' })
  } catch (error) {
    next(error)
  }
};

module.exports = {

  getById

};
