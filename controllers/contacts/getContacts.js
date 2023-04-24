const { ContactModel } = require("../../database/models");

async function getContacts(req, res, next) {
  try {
    const contacts = await ContactModel.find({});
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContacts,
};
