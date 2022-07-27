const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.find({ owner: _id }).populate(
    "owner",
    "_id name email"
  );
  res.json({ status: "success", code: 200, payload: { result } });
};
module.exports = getAll;
