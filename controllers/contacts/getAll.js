const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const data = await Contact.find({ owner }, "-createAt -updateAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "name email");
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
