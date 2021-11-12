const { Contact } = require("../../model");

const getAll = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const { _id } = req.user;
  const skip = (page - 1) * limit;
  const data = await Contact.find(
    { owner: _id },
    "_id name email phone owner",
    { skip, limit: +limit }
  ).populate("owner", "_id email");

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      data,
    },
  });
};
module.exports = getAll;
