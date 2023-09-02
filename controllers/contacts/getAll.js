const contactsBook = require("../../models/contacts.js");

const getAll = async (req, res, next) => {
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner: req.user.id };
  if (favorite === "true") {
    filter.favorite = true;
  } else if (favorite === "false") {
    filter.favorite = false;
  }

  try {
    const result = await contactsBook
      .find(filter, "-createdAt -updatedAt", {
        skip,
        limit,
      })
      .exec();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
