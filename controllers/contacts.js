const service = require("../service");

const get = async (req, res, next) => {
  try {
      const contacts = await service.listContacts();
      res.json(contacts)
  } catch (e) {
    next(e);
  }
};

module.exports = {
  get,
};
