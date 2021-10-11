const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id, "_id name email phone favorite");

  if (!result) {
    throw new NotFound(`Not found id=${id}`);
  }

  sendSuccessRes(res, { result });
};

module.exports = getById;
