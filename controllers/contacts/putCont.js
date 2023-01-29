const { Contact, joiSchema } = require("../../models");

const putCont = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "Missing required name field";
      throw error;
    }
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!contact) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({ status: "success", code: 200, data: contact });
  } catch (error) {
    next(error);
  }
};

module.exports = putCont;
