const Contact = require("../models/contact");

const { HttpErorr, ctrlWrapper } = require("../helpers");
const Joi = require("joi");
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../models/contacts");

const getAll = async (req, res, next) => {
  //   const contacts = await listContacts();
  const contacts = await Contact.find();
  res.json({ contacts, status: "200" });
};

const getById = async (req, res, next) => {
  // const contact = await getContactById(req.params.contactId);
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) {
    throw HttpErorr(404, "Not found");
    // const error = new Error("Not found");
    // error.status = 404;
    // throw error
    // res.json({ message: "Not found", status: "404" });
  }
  res.json({ contact, status: "200" });
};

const add = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    console.log("1");
    throw HttpErorr(400, "missing required name field");
  } else {
    console.log("2");
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().min(6).max(10).required(),
      favorite: Joi.boolean(),
    });

    const validRezalt = schema.validate(req.body);

    if (validRezalt.error) {
      throw HttpErorr(404, validRezalt.error);
    } else {
      console.log("3");
      //   const newContacts = await addContact(req.body);
      console.log(Contact.create);
      const newContacts = await Contact.create(req.body);
      res.status(201).json(newContacts);
    }
  }
};

const updateById = async (req, res, next) => {
  if (!req.body) {
    res.json({ message: "missing fields", status: "404" });
  }
  if (req.body) {
    const updateContacts = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    //  const updateContacts = await updateContact(req.params.contactId, req.body);

    if (updateContacts) {
      const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
        phone: Joi.string().min(6).max(10),
        favorite: Joi.boolean(),
      });
      const validRezalt = schema.validate(req.body);

      if (validRezalt.error) {
        throw HttpErorr(404, validRezalt.error);
      } else res.json({ updateContacts, status: "200" });
    } else res.json({ message: "Not found", status: "404" });
  }
};

const updateFavorite = async (req, res, next) => {
  if (!req.body) {
    res.json({ message: "missing fields", status: "404" });
  }
  if (req.body) {
    const updateContacts = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    //  const updateContacts = await updateContact(req.params.contactId, req.body);

    if (updateContacts) {
      const schema = Joi.object({
             favorite: Joi.boolean().required(),
      });
      const validRezalt = schema.validate(req.body);

      if (validRezalt.error) {
        throw HttpErorr(404, validRezalt.error);
      } else res.json({ updateContacts, status: "200" });
    } else res.json({ message: "Not found", status: "404" });
  }
};

const deleteById = async (req, res, next) => {
    // const contactDelete = await removeContact(req.params.contactId);
  const contactDelete = await Contact.findByIdAndRemove(req.params.contactId);
  if (!contactDelete) {
    throw HttpErorr(404, "found");
    //  res.json({ message: "Not found", status: "404" });
  } else {
    res.json({ message: "contact deleted", status: "200" });
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
