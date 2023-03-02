const { Contact } = require("../../models/contact");

const remove = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const contactToDelete = await Contact.findOneAndRemove({
    _id: id,
    owner: _id,
  });
  if (!contactToDelete) {
    const error = new Error(`contact whith id = ${id} not found`);
    error.status = 404;
    throw error;
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
