const { addContact } = require("../../models/contacts");

const addContacts = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res
      .status(201)
      .json({ code: 201, status: "success", payload: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = addContacts;
