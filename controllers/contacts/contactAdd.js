const addContact = require("../../model/contacts/addContact");

const contactAdd = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    console.log(newContact);
    res.status(201).json({ newContact, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = contactAdd;
