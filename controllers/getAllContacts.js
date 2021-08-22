const Contacts = require("../model");

const getAllContacts = async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
