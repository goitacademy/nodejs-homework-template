const { NotFound, BadRequest } = require("http-errors");
const { Contact } = require("../../models");

const updateStatusById = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    throw new BadRequest(`Field favorite is required`);
  }
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: _id },
    { favorite },
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json(updatedContact);
};

module.exports = { updateStatusById };
