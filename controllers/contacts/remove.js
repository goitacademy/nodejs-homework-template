const { Contact } = require("../../models/contact");
const { customError } = require("../../helpers");

const remove = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const contactToDelete = await Contact.findOneAndRemove({
    _id: id,
    owner: _id,
  });
  if (!contactToDelete) {
    throw customError(`contact whith id = ${id} not found`, 404);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactToDelete,
    },
  });
};

module.exports = remove;
