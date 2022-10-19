const { schemas, Contact } = require("../models/contact");

const updateById = () => async (req, res, next) => {
  const isValid = schemas.validateSchema.validate(req.body);
  if (isValid.error) {
    res.status(403).json({ message: isValid.error.details[0].message });
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (result !== null) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = updateById;
