const { ContactModel } = require("../../database/models");
const { updateStatusContactSchema } = require("../../schemas");
const { mapContactOutput } = require("./services");

async function updateStatusContact(req, res, next) {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    const { error } = updateStatusContactSchema.validate({ favorite });
    if (error) {
      const err = new Error("Missing fields");
      err.code = 400;
      throw err;
    }

    const updateStatusContact = await ContactModel.findByIdAndUpdate(
      id,
      {
        favorite,
      },
      { new: true }
    ).catch((error) => {
      const err = Error(error.message);
      err.code = 400;
      throw err;
    });

    if (!updateStatusContact) {
      const err = new Error("This contact is not found");
      err.code = 404;
      throw err;
    }
    const mappedContact = mapContactOutput(updateStatusContact);
    res.json(mappedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateStatusContact,
};
