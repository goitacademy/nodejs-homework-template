const { Contact } = require("../../models/contact");

const getAll = async (_, res, next) => {
  try {
    const result = await Contact.find({});
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
