import {
  Contact,
  contactValidate,
  favoriteValidate,
} from "../models/contact.js";
import "colors";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";

// Get full list of contacts
async function listContacts(req, res) {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  let query = { owner };

  if (favorite === "true") {
    query.favorite = true;
  }

  const data = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");

  res.json(data);
}

export const getAll = ctrlWrapper(listContacts);

//Get contact by ID
async function getContactById(req, res) {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) throw HttpError(404, "Contact not found");

  res.json(contact);
}

export const getById = ctrlWrapper(getContactById);

// Add new contact
async function addContact(req, res) {
  const { _id: owner } = req.user;
  const { error } = contactValidate(req.body);

  if (typeof error !== "undefined") {
    const errorMessages = error.details
      .map((err) => `${err.message}`)
      .join(", ");
    return res.status(400).json({ message: errorMessages });
  }

  const contact = await Contact.create({ ...req.body, owner });
  const { name, email, phone, favorite } = contact;

  if (!contact) res.status(400).json({ message: "missing required fields" });
  res.status(201).json({ name, email, phone, favorite });
}

export const add = ctrlWrapper(addContact);

// Update existed contact
async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const { error } = contactValidate(req.body);

  if (typeof error !== "undefined") {
    const errorMessages = error.details.map(
      (err) => `missing field: ${err.message}`
    );
    return res.status(400).json({ messages: errorMessages });
  }

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) return next();

  res.status(200).json(contact);
}

export const updateById = ctrlWrapper(updateContact);

// Update contact Status by ID
async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;

  const { error } = favoriteValidate(req.body);

  if (typeof error !== "undefined") {
    return res.status(400).json({ messages: "missing field favorite" });
  }

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) return next();

  res.status(200).json(contact);
}

export const updateFavorite = ctrlWrapper(updateStatusContact);

// Delete contact by ID
async function removeContact(req, res) {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndDelete(contactId);

  if (!contact) res.status(400).json({ message: "missing required fields" });

  res.status(200).json(contact);
}

export const removeContactById = ctrlWrapper(removeContact);

/////////////////////////////////////////////////////////////////////////////
// export async function add(req, res, next) {
//   try {
//     const contact = new Contact(req.body);
//     await contact.save();

//     res.status(201).json({
//       status: "success",
//       code: 201,
//       data: {
//         contact,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// export const getAll = async (req, res, next) => {
//   try {
//     const contacts = await Contact.find({});
//     res.json(contacts);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getById = async (req, res, next) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) {
//       return res.status(404).json({ message: "Not found" });
//     }
//     res.json(contact);
//   } catch (error) {
//     next(error);
//   }
// };

// export const removeContactById = async (req, res, next) => {
//   try {
//     const contact = await Contact.findByIdAndRemove(req.params.id);
//     if (!contact) {
//       return res.status(404).json({ message: "Not found" });
//     }
//     res.json({ message: "contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateById = async (req, res, next) => {
//   try {
//     const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!contact) {
//       return res.status(404).json({ message: "Not found" });
//     }
//     res.json(contact);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateFavorite = async (req, res, next) => {
//   try {
//     const contact = await Contact.findByIdAndUpdate(
//       req.params.id,
//       { favorite: req.body.favorite },
//       { new: true }
//     );
//     if (!contact) {
//       return res.status(404).json({ message: "Not found" });
//     }
//     res.json(contact);
//   } catch (error) {
//     next(error);
//   }
// };
