const { Contact } = require("../../models/contact");
const addContact = async (req, res, next) => {
  try {
    const newContact = await contactsOperation.addContact(req.body);
    res.json({
      status: "success",
      code: 201,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addContact;
