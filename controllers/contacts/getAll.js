const contactsOperations = require("../../models/contactsModels");

const getAll = async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
