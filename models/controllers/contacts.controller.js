const db = require("../contacts");
const { HttpError } = require("../helpers/index");


// get list
async function getContacts(req, res) {
  const { limit } = req.query;
  console.log("limit:", limit);
  const contacts = await db. listContacts({ limit });
  console.log("movies:", contacts);
  res.json(contacts);
}

// get by id
async function getContact(req, res, next) {
  const { id } = req.params;
  const contact = await db.getContactById(id);

  if (!contact) {
    return next(HttpError(404, "Movie not found"));
  }
  return res.json(contact);
}

// post
async function createContact(req, res, next) {
  const {name, email, phone} = req.body;
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

  console.log("name:", name, "email:", email, "phone:", phone);
  const newContact = await db.addContact(name, email, phone);
  res.status(201).json(newContact);
}

// routMovies.put('/1', (req, res) => {
// // update movie by id
//    res.status(200).json({ id: 1, name: "The Godfather" });
// });

async function deleteContact (req, res, next) {
  const { id } = req.params;
  const contact = await db.getContactById(id);
  if (!contact) {
    return next(HttpError(404, "No contact"));
  }
  await db.removeContact(id);
  return res.status(200).json(contact);
}

module.exports = {
  getContact,
  getContacts,
  createContact,
  deleteContact,
};
