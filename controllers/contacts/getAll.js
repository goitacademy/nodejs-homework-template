const contactsOperations = require("../../model");

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "Succsess",
      code: 200,
      result: contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
