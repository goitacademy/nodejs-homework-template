const { Contact } = require("../../models/contact");

const getContactsList = async (_, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactsList;
