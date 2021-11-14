const { NotFound, BadRequest } = require("http-errors");
// const contactsOperations = require("../../model/contacts");
const { Product } = require("../../models");
const updateFavoriteController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined) {
      throw new BadRequest("missing field favorite");
    }
    const result = await Product.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    ).populate("owner", "_id email");
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

module.exports = updateFavoriteController;
