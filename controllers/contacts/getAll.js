const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 30, favorite = false } = req.query;
  const skip = (page - 1) * limit;

  let searchParams;
  favorite === "true"
    ? (searchParams = { favorite: true, owner: _id })
    : (searchParams = { owner: _id });

  const result = await Contact.find({ ...searchParams }, "", {
    skip,
    limit: Number(limit),
  });

  res.status(201).json({
    status: "succes",
    code: 201,
    result,
  });
};

module.exports = getAll;
