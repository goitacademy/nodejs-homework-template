const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models/contact");

const removeById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndRemove(
    id,
    "_id name email phone favorite"
  );

  if (!result) {
    throw new NotFound("Not found.");
  }
  sendSuccessRes(res, { message: "Success delete" });
};

module.exports = removeById;
