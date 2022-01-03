const createError = require("http-errors");
const { Contact } = require("../../models");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new createError(404, {
      message: `Contact with id=${id} not found`,
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = updateContact;
