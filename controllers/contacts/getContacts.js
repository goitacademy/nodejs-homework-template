const { Contact } = require("../../models");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res
      .status(200)
      .json({ code: 200, status: "success", payload: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
