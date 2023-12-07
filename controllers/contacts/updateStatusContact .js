const { Contact, schemas } = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      if (error.details[0].message === '"favorite" is required') {
        error.message = "missing field favorite";
      }
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;