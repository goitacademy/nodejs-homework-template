const { Contact, joiSchemaUpdate } = require("../../models/contact");

const change = async (req, res, next) => {
  try {
    const { error } = joiSchemaUpdate.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = change;
