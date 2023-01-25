const { Contact } = require("../../models");
const createError = require("http-errors");

const changeFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  // const { name, email, phone } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
};

module.exports = changeFavorite;
