const Contacts = require("../repositories/contacts");

const getAllContacts = async (_req, res, next) => {
  try {
    const result = await Contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
