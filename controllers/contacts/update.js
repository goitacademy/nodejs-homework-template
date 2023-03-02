const { Contact } = require("../../models/contact");

const update = async (req, res) => {
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

module.exports = update;
