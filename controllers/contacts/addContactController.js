// const contactsOperations = require("../../model/contacts");
const { Product } = require("../../models");

const addContactController = async (req, res, next) => {
  try {
    const newProduct = { ...req.body, owner: req.user._id };
    const result = await Product.create(newProduct);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContactController;
