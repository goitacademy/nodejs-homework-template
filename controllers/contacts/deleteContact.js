const { ContactModel } = require("../../database/models");

async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    const result = await ContactModel.findByIdAndDelete(id).catch((error) => {
      const err = Error(error.message);
      err.code = 400;
      throw err;
    });

    if (!result) {
      const err = new Error("This contact is not found");
      err.code = 404;
      throw err;
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  deleteContact,
};
