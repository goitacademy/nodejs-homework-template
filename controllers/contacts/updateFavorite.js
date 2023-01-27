const { favoriteJoiSchema } = require("../../models");
const { Contact } = require("../../models");

const updateStatusContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const favorite = req.body.favorite;

    if (!favorite) {
      res.status(400).json({
        message: "missing field favorite",
      });
    }

    const { error } = favoriteJoiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const updateById = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );

    if (!updateById) {
      const error = new Error(`Contact with this id: ${id} is not found`);
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      result: updateById,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
