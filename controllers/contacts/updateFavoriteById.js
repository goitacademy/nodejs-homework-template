const contactsOperation = require("../../models/contacts");

const updateFavoriteById = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean") {
    res.json({
      status: "error",
      code: 400,
      message: "missing field favorite",
    });
  }

  const result = await contactsOperation.updateStatusContact(
    contactId,
    req.body
  );

  if (!result) {
    res.json({
      status: "error",
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
    message: `${result.name}'s favorite status was updated successfully`,
  });
};

module.exports = updateFavoriteById;
