const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");
const ObjectId = require("mongodb").ObjectId;

const getDelete = async (req, res) => {
  const owner = req.user._id;
  const _id = ObjectId(req.params.contactId);
  const resultDelete = await Contact.findByIdAndRemove({owner,_id});
  if (!resultDelete) {
    throw new NotFound(` not found `);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      resultDelete,
    },
  });
};
module.exports = getDelete;
