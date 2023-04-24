const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("./services");

async function getContact(req, res, next) {
  try {
    const { id } = req.params;
    const contacts = await ContactModel.findById(id).catch((error) => {
      const err = Error(error.message);
      err.code = 400;
      throw err;
    });

    if (!contacts) {
      const error = new Error("This contact is not found");
      error.code = 404;
      throw error;
    }

    const mappedContact = mapContactOutput(contacts);
    res.json(mappedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContact,
};
