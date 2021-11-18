const { Product } = require("../../model");

const contactAdd = async (req, res, next) => {
  try {
    const newContact = await Product.create(req.body);
    console.log(newContact);
    res.status(201).json({ newContact, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = contactAdd;
