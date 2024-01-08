// @ GET /api/contacts

const contacts = require("../../models/contacts");

const getAllContacts = async (_req, res, next) => {
  try {
    const result = await contacts.listContacts();

    return res.json({
      status: "Success",
      code: 200,
      message: "Contacts found",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
