const ObjectId = require("mongodb").ObjectId;
const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const getPut = async (req, res) => {
  const owner = req.user._id;
  const _id = ObjectId(req.params.contactId);
  const resultPut = await Contact.findByIdAndUpdate(
    { owner, _id },
    { $set: req.body },
    { new: true }
  );
  if (!resultPut) {
    throw new NotFound("missing fields");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      resultPut,
    },
  });
};
module.exports = getPut;
