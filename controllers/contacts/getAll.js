const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, favorite = [true, false] } = req.query;

    const skip = (page - 1) * limit;

    const userId = req.user._id;
    const result = await Contact.find({ owner: userId, favorite }, "-__v", {
      skip,
      limit,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
