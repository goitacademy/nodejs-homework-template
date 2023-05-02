<<<<<<< HEAD
const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.status(200).json(result);
};

module.exports = { getAll: ctrlWrapper(getAll) };
=======
const {Contact} = require("../../models");
const {ctrlWrapper} = require("../../helpers");

const getAll = async (req, res) => {
    const result = await Contact.find() ;
    res.status(200).json(result);
};

module.exports = {getAll: ctrlWrapper(getAll)};
>>>>>>> 22513394b068499e24accb9e01491fc86a886f58
