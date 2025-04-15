const { Contact } = require("../../models/contact");
const { customError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const { _id } = req.user;
  const contactToUpdate = await Contact.findOneAndUpdate(
    { _id: id, owner: _id },
    body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!contactToUpdate) {
    throw customError(`contact whith id = ${id} not found`, 404);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactToUpdate,
    },
  });
};

module.exports = updateFavorite;
