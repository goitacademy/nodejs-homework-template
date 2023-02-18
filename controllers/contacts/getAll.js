const { Contact } = require("../../models/contact");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const { _id } = ObjectId(req.user);
  //пагінація товару
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email phone");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};
module.exports = getAll;
