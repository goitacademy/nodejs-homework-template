const { NotFound, BadRequest } = require("http-errors");
const { Contact } = require("../../models/contact");

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: _id },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json(updatedContact);
};

module.exports = { updateById };
