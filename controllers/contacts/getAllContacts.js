const { Contact } = require("../../models");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: "success",
      code: 200,
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
