const { Contact } = require("../../models");
const createError = require("http-errors");

const getAll = async (req, res, next) => {
  try {
    const {_id} = req.user;
    const {page = 1, limit = 5} = req.query;
    const skip = (page - 1) * limit;
    const allContacts = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id email subscription");
    if (!allContacts) {
      throw createError(404, `No contacts, please try later.`);
    }
    res.json({
      status: "Success",
      code: 200,
      data: {
        result: allContacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
