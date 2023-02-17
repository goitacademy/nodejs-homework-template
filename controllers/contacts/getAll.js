const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;

    const allContacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");

    if (favorite) {
      const filterContactsByStatus = allContacts.filter(
        (contact) => contact.favorite === Boolean(favorite)
      );
      res.json({
        status: "Success",
        code: 200,
        data: {
          result: filterContactsByStatus,
        },
      });
      return;
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
