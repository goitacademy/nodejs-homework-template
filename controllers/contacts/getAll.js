const { listContacts } = require("../../models/contacts.js");

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "Sucess",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
