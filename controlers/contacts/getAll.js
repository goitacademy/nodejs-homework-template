const contactsOperations = require("../../models/contacts");


const getAll = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  try {
    res.json({
      status: "success",
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
