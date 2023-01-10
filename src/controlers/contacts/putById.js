const server = require("../../services/contacts");
const schema = require("../../schemas/schemas");
const putById = async (req, res) => {
  try {
    const validationResult = schema.schemaPut.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    if (Object.keys(req.body).length === 0) {
      console.log("bye");
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await server.updateContact(contactId, req.body, userId);

    res.json({ contact, message: "success" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  putById,
};
