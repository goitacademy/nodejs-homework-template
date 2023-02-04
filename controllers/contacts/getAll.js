const Contact = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite, name } = req.query;
  const skip = (page - 1) * limit;
  if (favorite && name) {
    const contacts = await Contact.find({ owner: _id, favorite, name }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
    res.json({
      data: {
        contacts,
      },
    });
  } else if (favorite && !name) {
    const contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
    res.json({
      data: {
        contacts,
      },
    });
  } else if (!favorite && name) {
    const contacts = await Contact.find({ owner: _id, name }, "", {
      skip,
      limit: Number(limit),
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
    }).populate("owner", "_id email subscription");
    res.json({
      data: {
        contacts,
      },
    });
  }
};

module.exports = getAll;
