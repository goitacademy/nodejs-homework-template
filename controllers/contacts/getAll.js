const { Contact } = require("../../models/contact");
const { BadRequest } = require("http-errors");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite = null } = req.query;

  if (favorite !== "true" && favorite !== "false") {
    throw new BadRequest("Bad request, check favorite field");
  }

  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id, favorite }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
