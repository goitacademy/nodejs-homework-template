// const contactsOperations = require("../../model/contacts");
const { Product } = require("../../models");

const listContactsController = async (req, res, next) => {
  try {
    const contacts = await Product.find({});
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
module.exports = listContactsController;
