const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateFavoriteContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const updateFavorite = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (!updateFavorite) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: updateFavorite,
    },
  });
};

module.exports = updateFavoriteContact;
