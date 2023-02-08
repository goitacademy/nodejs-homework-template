const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");
const ObjectId = require("mongodb").ObjectId;

const getPatch = async (req, res) => {
  const owner = req.user._id;
  const _id = ObjectId(req.params.contactId);
  const { favorite } = req.body;
  const resultPut = await Contact.findOneAndUpdate(
    { owner, _id },
    { $set: { favorite } },
    { new: true } //findByIdAndUpdate
  );
  if (!resultPut) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      resultPut,
    },
  });
};
module.exports = getPatch;
