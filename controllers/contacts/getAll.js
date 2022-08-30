const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email subscription");
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  }
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email subscription");
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
