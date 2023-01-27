const { Contact } = require("../../models");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;

    if (req.query.favorite === "true") {
      const contacts = await Contact.find({ owner: _id, favorite: true }, "", {
        favorite: true,
      });
      res.json({
        status: "success",
        code: 200,
        contacts,
      });
      return;
    }

    // Pagination
    const { page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id, name, email");

    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
