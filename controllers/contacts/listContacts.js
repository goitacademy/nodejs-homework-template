const { Contact } = require("../../models/Contact");

const listContacts = async (req, res, next) => {
  try {
    const owner = req.user._id;
    let { page, limit } = req.query;
    const skip = (page - 1) * limit;
    limit = parseInt(limit) > 20 ? 20 : parseInt(limit);

    const result = await Contact.find({ owner })
      .populate("owner", "email")
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
