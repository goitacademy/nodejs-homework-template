const { Contact } = require("../../models");

const listContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    let queryObject;
    favorite === undefined
      ? (queryObject = { owner: _id })
      : (queryObject = { owner: _id, favorite });
    const contacts = await Contact.find(queryObject, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};
module.exports = listContacts;
