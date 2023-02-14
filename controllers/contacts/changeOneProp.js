const { Contact } = require("../../models/contact");
// const ObjectId = require("mongodb").ObjectId;

const changeOneProp = async (req, res, next) => {
  const owner = req.user._id;
  const _id = req.params.id;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    { owner, _id },
    { $set: { favorite } },
    { new: true }
  );
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = changeOneProp;
