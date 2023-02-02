const { Contact } = require("../../models/index");

const getAll = async (req, res, next) => {
  try {
    const {_id} = req.user;
    const result = await Contact.find({owner: _id}, "-createdAt -updatedAt").populate("owner", "_id email subscription");
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
