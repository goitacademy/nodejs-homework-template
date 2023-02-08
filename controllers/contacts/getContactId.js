const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");
const ObjectId = require("mongodb").ObjectId;

const getContactId = async (req, res) => {
  const owner = req.user._id;
  const _id = ObjectId(req.params.contactId);
  const resultId = await Contact.findOne({ owner, _id }); // findOne({_id:contactId}) - спосіб шукати по ID

  if (!resultId) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: resultId,
    },
  });
};
module.exports = getContactId;
