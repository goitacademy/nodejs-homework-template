const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateFavoriteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavoriteById;