const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

async (req, res) => {
  const { contactId } = req.params;
  const resultDelete = await Contact.findByIdAndRemove(contactId);
  if (!resultDelete) {
    throw new NotFound(` not found `);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      resultDelete,
    },
  });
};
