const { Contact } = require("../../models");
const { NotFound, Unauthorized } = require("http-errors");
const { User } = require("../../models");

const findContactById = async (req, res, next) => {
  const contactId = req.params.id;
  const userId = req.user._id;
  const result = await Contact.find({ owner: userId, _id: contactId });

  if (!result) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = findContactById;
