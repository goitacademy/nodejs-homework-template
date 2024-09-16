const Contact = require("../models/contacts");

async function getAll(req, res, next) {
  try {
    const docs = await Contact.find(
      { year: { $gte: 2020 }, genre: { $in: ["Action", "Biography"] } }
    ).exec();

    return res.send(docs);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  const { id } = req.params;

  try {
    const doc = await Contact.findById(id).exec();

    if (doc === null) {
      return res.status(404).send({ message: "Contact not found" });
    }

    return res.send(doc);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  const contact = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
  };

  try {
    const doc = await Contact.create(contact);

    return res.status(201).send(doc);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  const { id } = req.params;

  const contact = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
  };

  try {
    const result = await Contact.findByIdAndUpdate(id, contact, { new: true }).exec();

    if (result === null) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndRemove(id).exec();

    if (result === null) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};