const Contacts = require("./contactsSchema")

async function listContacts (req, res, next) {
  try {
    const getContacts = await Contacts.find().exec()

    res.send(getContacts)
  } catch (error) {
    next(error)
  }
}

async function getContactById (req, res, next) {
  const {id} = req.params
  try {
    const contact = await Contacts.findById(id).exec();

    if (contact === null) {
      return res.status(404).send("Contact not found:(");
    }

    res.send(contact);
  } catch (error) {
    next(error)
  }
}

async function removeContact (req, res, next) {
  const {id} = req.params
  try {
    const result = await Contacts.findByIdAndDelete(id);

    if (result === null) {
      return res.status(404).send("Contact not found:(");
    }

    res.send(id);
  } catch (error) {
    next(error)
  }
}

async function addContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const result = await Contacts.create(contact);

    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
}

async function updateContact(req, res, next) {
  const { id } = req.params;

  const book = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const result = await Book.findByIdAndUpdate(id, book, { new: true });

    if (result === null) {
      return res.status(404).send("Book not found");
    }

    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function updateFavorite (req, res) {
  const { contactId } = req.params;
  try {
    const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
}
