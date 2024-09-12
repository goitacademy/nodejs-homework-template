const {HttpError} = require("../../helpers");
const { Contact } = require("../../models/contact/index");

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user;

  const data = await Contact.create({...req.body, owner});

    if (!data) {
      throw HttpError(404, "Not found");
    }

  res.status(201).json(data);
}

module.exports = addNewContact;