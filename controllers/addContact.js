const Contacts = require("../repositories/contacts");

const addContact = async (req, res, next) => {
  try {
    const result = await Contacts.addContact(req.body);

    return res.status(201).json({
      status: "success",
      code: 201,
      data: { result: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
