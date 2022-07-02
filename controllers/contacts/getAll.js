const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner }, "-__v", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email");
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

module.exports = getAll;
