// PATCH - add contact to favorites
const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite = false } = req.body;
    const { error } = schemas.updateStatus.validate(req.body);
    if (error) {
      throw createError(400, "missing field favorite");
    }
    if (req.body) {
      const result = await Contact.findByIdAndUpdate(id, { favorite });
      if (result) {
        res.status(200).json({
          data: result,
        });
      } else {
        throw createError(404);
        // res.status(404).json({
        //   message: `Not found contact id: ${id}`,
        //   data: "Not Found",
        // });
      }
    } else {
      throw createError(400);
      // res.status(400).json({
      //   message: "missing field favorite",
      // });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = updateFavorite;