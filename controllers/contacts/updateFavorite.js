const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const updateFavorite = async (req, res) => {
  const { _id } = req.user;
  const id = req.params.contactId;
  const body = req.body;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: _id },
    body,
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    data: {
      updatedContact,
    },
  });
};

module.exports = updateFavorite;
