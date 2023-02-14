const { Contact } = require("../../models/contact");
// const ObjectId = require("mongodb").ObjectId;

const change = async (req, res, next) => {
  const owner = req.user._id;
  const { _id } = req.params.id;
  const result = await Contact.findByIdAndUpdate(
    { owner, _id },
    { $set: req.body },
    { new: true }
  );
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ result });
};

module.exports = change;
