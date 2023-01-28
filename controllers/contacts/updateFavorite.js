const { Contact } = require("../../models");
const createError = require("http-errors");

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (!req.body) {
    throw createError(400, `missing field favorite`);
  }

  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw createError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: `contact updated`,
    data: {
      result,
    },
  });
};

module.exports = updateFavorite;
