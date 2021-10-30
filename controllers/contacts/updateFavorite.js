const { NotFound, BadRequest } = require("http-errors");
const { Contact } = require("../../models");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const owner = req.user._id;
  const { favorite } = req.body;
  const updateContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { favorite },
    { new: true }
  );
  if (favorite === undefined) {
    throw new BadRequest("missing field favorite");
  }
  if (!updateContact) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: { updateContact },
  });
};

module.exports = updateFavorite;
