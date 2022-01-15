const { NotFound } = require("http-errors");
const { Contact } = require("../../model");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    if (!result) {
      throw new NotFound(`Product with id ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "missing fields",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = updateFavorite;
