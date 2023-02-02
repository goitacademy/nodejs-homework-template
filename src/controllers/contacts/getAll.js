const { Contact } = require("../../models/index");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    // console.log(req.query);
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;


    if (favorite) {
      const favoriteData = await Contact.find({ owner: _id, favorite: true });
  
      res.json({
        favoriteData,
      });
    }

    const result = await Contact.find(
      { owner: _id },
      "",
      { skip, limit: Number(limit) }
    ).populate("owner", "_id email subscription");


    res.json({
      status: "success",
      code: 200,
      data: { result: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
