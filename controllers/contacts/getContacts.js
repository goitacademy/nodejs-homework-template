const { listContacts } = require("../../models/contacts");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res
      .status(200)
      .json({ code: 200, status: "success", payload: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
