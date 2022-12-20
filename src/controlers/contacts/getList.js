const server = require("../../models/contacts");

const getList = async (req, res, next) => {
  try {
    const list = await server.listContacts();
    res.json(list);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getList,
};
