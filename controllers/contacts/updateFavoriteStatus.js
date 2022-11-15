const { Contact } = require("../../models");

const createError = require("http-errors");

const updateFavoriteStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    res.status(400).json({
      status: 400,
      message: "missing field favorite",
    });
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );

  if (!result) {
    res.status(404).json({
      status: 404,
      message: "Not found",
    });
    throw createError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateFavoriteStatus;
