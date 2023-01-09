const { Contact } = require("../../models");

const updateContactFavorite = async (req, res, next) => {
  const contactId = req.params.id;
  const userId = req.user._id;
  const { favorite } = req.body;
  const result = await Contact.findOneAndUpdate(
    { contactId, userId },
    { favorite },
    { new: true }
  );

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

module.exports = updateContactFavorite;
