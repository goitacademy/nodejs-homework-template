const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const deleteContact = async (req, res, next) => {
  const contactId = req.params.id;
  const userId = req.user._id;
  const result = await Contact.findOneAndRemove({
    owner: userId,
    _id: contactId,
  });

  if (!result) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = deleteContact;
