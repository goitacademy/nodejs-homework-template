const { ctrlWrapper } = require("../../helpers");

const Contact = require("../../models/contact");

  const getAll = async (req, res) => {
    const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit,
      }).populate("owner", "-_id name email");   
    res.status(200).json(result);
};

module.exports = { getAll: ctrlWrapper(getAll) };
