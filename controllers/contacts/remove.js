const { Contact } = require("../../models/contact");

const remove = async (req, res) => {
  const { id } = req.params;
  const contactToDelete = await Contact.findByIdAndRemove(id);
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
