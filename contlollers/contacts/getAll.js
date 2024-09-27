const contactOperations = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const contact = await contactOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
