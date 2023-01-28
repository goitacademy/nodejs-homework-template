const contactsOperations = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.status(200).json({
      status: "Success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
