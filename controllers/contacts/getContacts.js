const { Product } = require("../../model");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Product.find({});
    res.status(200).json({ contacts, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = getContacts;
