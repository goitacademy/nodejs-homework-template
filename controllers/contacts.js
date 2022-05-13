const service = require("../service");

const get = async (req, res, next) => {
  try {
      const contacts = await service.listContacts();
      res.json(contacts)
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
    const { contactId } = req.params;
  try {
      const contact = await service.getContactById(contactId);
      if (!contact) {
          res.status(404).json({message: "Contact not found"})
      }
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

module.exports = {
    get,
    getOne
};
