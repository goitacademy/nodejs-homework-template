
const { HttpError } = require("../helpers/index");
const {Contact} = require("../mod/contact")


// get list
async function getContacts(req, res) {
  const { limit } = req.query;
  console.log("limit:", limit);
  const contacts = await Contact.find({}).limit(limit);
  console.log("movies:", contacts);
  res.json(contacts);
}

// get by id
async function getContact(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    return next(HttpError(404, "Contact not found"));
  }
  return res.json(contact);
}

// post
async function createContact(req, res, next) {
  const {name, email, phone,  favorite} = req.body;
  //   1 - own validation
  //   if (!title) {
  //     return next(HttpError(400, "title is required!"));
  //   }
  //   2 - with library
//   const schema = Joi.object({
//     title: Joi.string().min(3).required(),
//   });

//   const { error } = schema.validate(req.body);

//   if (error) {
//     return next(HttpError(400, error.message));
//   }

  console.log("name:", name, "email:", email, "phone:", phone, "favorite:", favorite);
  const newContact = await Contact.create({name, email, phone, favorite});
  return res.status(201).json(newContact);
}

async function deleteContact (req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  await Contact.findByIdAndRemove(id);
  return res.status(200).json(contact);
}


async function updateContact(req, res, next) {
  const { body } = req;
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, body)
  if (!contact) {
    return next (HttpError(404, "Not found"));
  }
  return res.json(contact);
}


async function updateStatusContact(req, res, next) {
  const { body } = req;
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate(id, body, {new: true}) 
    if (!contact) {
      return next (HttpError(404, "Not found"));
    }
    return res.status(200).json(contact);
  }

//     // ==== update ====
//     // const contact = await Contact.findByIdAndUpdate(
//     //   '63e662b49cff7686e6c5c136',
//     //   { name: 'updated name 3' },
//     //   { new: true }
//     // );
//     // console.log('updated contact: ', contact);



module.exports = {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
