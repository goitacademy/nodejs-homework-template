const { UpsErrors, schemas, ctrlWraper } = require("../../Helpers");
const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  const {_id: owner} = req.user;
    const { error } = schemas.validate(...req.body, owner);
    if (error) {
      throw UpsErrors(404, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  };

  module.exports = ctrlWraper(addContact);