const { Contact } = require("../../models/contact");

const getContactsList = async (req, res, next) => {
  try {
    const { _id } = req.user;
    // const { page = 1, limit = 20, favorite } = req.query;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const favorite = req.query.favorite ? req.query.favorite === "true" : null;
    const filter = { owner: _id };
    if (favorite !== null) {
      filter.favorite = favorite;
    }
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(filter, "", {
      skip,
      limit,
    }).populate("owner", "_id name email");
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactsList;
