const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const getContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id).populate({
    path: "owner",
    select: "_id email",
  });
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
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
