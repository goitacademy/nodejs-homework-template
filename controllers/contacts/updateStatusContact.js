const { Contact } = require("../../models");
const { contactStatusSchema } = require("../../schemas");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactStatusSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
      return;
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!updatedContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }
    res.json({
      status: "success",
      code: 200,
      data: { result: updatedContact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
