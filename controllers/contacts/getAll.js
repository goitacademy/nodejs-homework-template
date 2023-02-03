const Contact = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit),
      favorite,
    }).populate("owner", "_id email subscription");
    res.json({
      data: {
        contacts,
      },
    });
  } else {
    const contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
      favorite,
    }).populate("owner", "_id email subscription");
    res.json({
      data: {
        contacts,
      },
    });
  }
};

module.exports = getAll;
