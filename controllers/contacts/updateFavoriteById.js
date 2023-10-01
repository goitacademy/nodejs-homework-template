const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");
const { HttpError } = require("../../helpers");

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, {
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: "Not Found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      contact: result,
    },
  });
};

module.exports = { updateFavoriteById: ctrlWrapper(updateFavoriteById) };
