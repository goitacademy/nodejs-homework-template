const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  // const filter = typeof favorite === "boolean" ? { favorite } : {};
  const result = await Contact.find({ owner }, "-createdAt, - updatedAt", {
    skip,
    limit,
  }).populate("owner", "name, email");
  // console.log(result);
  // ({}, "-createdAt, - updatedAt");

  res.json(result);
};
module.exports = getAll;
