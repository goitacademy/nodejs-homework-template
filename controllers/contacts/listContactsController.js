// const contactsOperations = require("../../model/contacts");
const { Product } = require("../../models");

const listContactsController = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const { _id } = req.user;
    const result = await Product.find(
      { owner: _id },
      "_id name email phone favorite owner",
      { skip, limit: +limit }
    ).populate("owner", "_id email");
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = listContactsController;
