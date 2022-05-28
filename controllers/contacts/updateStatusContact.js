const { Contact, favoriteJoiSchema } = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = favoriteJoiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing field favorite";
      throw error;
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    if (!contact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
