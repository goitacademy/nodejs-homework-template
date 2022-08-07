const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const data = await Contact.find({}, "-createAt -updateAt");
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
