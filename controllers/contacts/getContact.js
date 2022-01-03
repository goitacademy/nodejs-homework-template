const createError = require("http-errors");
const { Contact } = require("../../models");

const getContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw new createError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = getContact;
