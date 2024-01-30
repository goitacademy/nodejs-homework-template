const path = require("path");

const { addContactSchema, updateContactSchema } = require(path.join(
  __dirname,
  "../schemas/contacts.js"
));

const Contact = require("../models/contact");

async function getContacts(req, res, next) {
  try {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const favorite = req.query.favorite === "true"; // Перевіркаь чи фейворіт тру

    const skip = (page - 1) * limit;

    const query = {
      ownerId: userId,
    };

    if (favorite) {
      query.favorite = true;
    }

    const contacts = await Contact.find(query).skip(skip).limit(limit);

    const totalContacts = await Contact.find(query).countDocuments();
    console.log("total Contacts " + totalContacts);
    const totalPages = Math.ceil(totalContacts / limit);
    console.log("total Pages " + totalPages);

    res.send({
      contacts,
      currentPage: page,
      totalPages,
      totalContacts,
    });
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const contact = await Contact.findById(id);

    console.log(contact);

    if (contact === null) {
      return res.status(404).json({ message: "Not found" });
    }
    if (contact.ownerId.toString() !== userId) {
      return res.status(404).json({ message: "Not found" });
    }

    res.send(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  const response = addContactSchema.validate(req.body, { abortEarly: false });
  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }

  const contact = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    favorite: req.body.favorite,
    ownerId: req.user.id,
  };

  try {
    const result = await Contact.create(contact);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  const response = updateContactSchema.validate(req.body, {
    abortEarly: false,
  });
  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }

  const { id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const userId = req.user.id;

  const oldContact = await Contact.findById(id);
  if (oldContact === null) {
    return res.status(404).json({ message: "Not found" });
  }
  if (oldContact.ownerId.toString() !== userId) {
    return res.status(404).json({ message: "Not found" });
  }

  const contact = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    favorite: req.body.favorite,
    ownerId: req.user.id,
  };

  try {
    const result = await Contact.findByIdAndUpdate(id, contact, { new: true });

    if (result === null) {
      return res.status(404).send("Not found");
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  const { id } = req.params;

  const userId = req.user.id;

  const contact = await Contact.findById(id);
  if (contact === null) {
    return res.status(404).json({ message: "Not found" });
  }
  if (contact.ownerId.toString() !== userId) {
    return res.status(404).json({ message: "Not found" });
  }

  try {
    const result = await Contact.findByIdAndDelete(id);

    if (result === null) {
      return res.status(404).send({ message: "Not found" });
    }

    return res.status(200).send("Contact deleted");
  } catch (error) {
    next(error);
  }
}

async function changeContactFavorite(req, res, next) {
  const { id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("missing field favorite");
  }

  const userId = req.user.id;

  const contact = await Contact.findById(id);
  if (contact === null) {
    return res.status(404).json({ message: "Not found" });
  }
  if (contact.ownerId.toString() !== userId) {
    return res.status(404).json({ message: "Not found" });
  }

  try {
    const result = await Contact.findByIdAndUpdate(
      id,
      {
        favorite: req.body.favorite,
      },
      { new: true }
    );

    if (result === null) {
      return res.status(404).send("Not found");
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  changeContactFavorite,
};
