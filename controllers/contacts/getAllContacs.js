const operations = require("../../model/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
