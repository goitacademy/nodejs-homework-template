const { Contact } = require("../../models");
const createError = require("http-errors");

const getAll = async (req, res, next) => {
  try {
   const { page, limit, favorite } = req.query;

    const skip = (page - 1) * limit;

    const { _id } = req.user;

    await Contact.aggregate([
      {
        $match: {
          favorite,
        },
      },
    ]);

    const allContacts = await Contact.find(
      { owner: _id, favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit: +limit,
      }
    ).populate("owner", "_id email subscription");
    if (!allContacts.length) {
      throw createError(404, `No contacts, please try later.`);
    }
    res.json({
      status: "Success",
      code: 200,
      result: allContacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;

