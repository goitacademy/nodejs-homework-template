const { Contact } = require("../../models");
const successRes = require("./successRes");

async function getContactsController(req, res, next) {
  try {
    const contacts = await Contact.find({});

    res.json(successRes(contacts));
  } catch (error) {
    next(error);
  }
}

module.exports = getContactsController;
