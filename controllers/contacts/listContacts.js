/* eslint-disable quotes */
/* eslint-disable semi */
const contactsOperations = require("../../model");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      message: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
