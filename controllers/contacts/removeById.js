const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models");

const removeById = async (req, res, next) => {
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
