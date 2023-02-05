const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateStatusContactController = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (!updatedContact) throw new NotFound(`Contact with id=${id} not found`);

  res.status(200).json(updatedContact);
};

module.exports = updateStatusContactController;
