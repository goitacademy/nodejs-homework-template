
const { Contact } = require("../Validations/contactShema");
const { createNotFoundHttpError } = require("../helpers/index");

async function getAll(req, res, next) {
  const { _id: owner } = req.user;
  const { limit, page } = req.query;
  console.log(":", limit, page);

  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }).skip(skip).limit(limit);

  return res.json({
    data: contacts,
  });
}

async function create(req, res, next) {
  const { _id: owner } = req.user;
  const contact = req.body;
  const createdContact = await Contact.create({...contact,owner});
  return res.status(201).json({
    data: {
      contacts: createdContact,
    },
  });
}

async function deleteById(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (contact) {
    await Contact.findByIdAndDelete(id);
    return res.json({ data: { contact } });
  }
  return next(createNotFoundHttpError());
}

async function updateById(req, res, next) {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  return res.json({ data: { contact: updatedContact } });
}

async function findOneById(req, res, next) {
  const { id } = req.params;

  const contact = await Contact.findById(id);
  if (contact) {
    return res.json({ data: { contact } });
  }
  return next(createNotFoundHttpError());
}

module.exports = {
  getAll,
  create,
  deleteById,
  updateById,
  findOneById,
};