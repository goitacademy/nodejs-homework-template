const { Contact } = require("../../models/contact");

const updateFavorite = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const contactToUpdate = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!contactToUpdate) {
    const error = new Error(`contact whith id = ${id} not found`);
    error.status = 404;
    throw error;
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
