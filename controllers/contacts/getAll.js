const contacstOperations = require('../../model/contacts');

const getAll = async (req, res, next) => {
  try {
    const contacts = await contacstOperations.listContacts();
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAll

};
