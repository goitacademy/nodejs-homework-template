const { Contact } = require("../../models/contact");
const { updContactSchema } = require("../../middlewares/validateBody");

const updateById = async (req, res) => {
  const body = req.body;
  const id = req.params.contactId;
  const { error } = updContactSchema.validate(body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const updContact = await Contact.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });
  if (!updContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(updContact);
};

module.exports = updateById;
