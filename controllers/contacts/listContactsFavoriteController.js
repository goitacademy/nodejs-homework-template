const { Product } = require("../../models");

const listContactsFavoriteController = async (req, res, next) => {
  try {
    const { favorite: favQuery } = req.query;
    const { _id } = req.user;
    const result = await Product.find(
      { owner: _id, favorite: favQuery },
      "_id name email phone favorite owner"
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
module.exports = listContactsFavoriteController;
