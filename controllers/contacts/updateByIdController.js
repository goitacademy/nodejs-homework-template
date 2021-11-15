const { NotFound } = require("http-errors");
// const contactsOperations = require("../../model/contacts");
const { Product } = require("../../models");
const updateByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Product.findByIdAndUpdate(contactId, req.body, {
      new: true,
    }).populate("owner", "_id email");
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
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

module.exports = updateByIdController;
