const { Contact } = require("../models/contacts");

const { ctrlWrapper } = require("../decorators/ctrl.Wrapper");

const { HttpError } = require("../helpers/HttpError");

const {
  contactAddSchema,
  updateFavoriteSchema,
} = require("../schemas/contacts");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(result);
};

// const addContact = async (req, res, next) => {
//   const { _id: owner } = req.user;

//   const { name, email, phone, } = req.body;

//   if (!name && !email && !phone) {
//     return next(new HttpError(400, "Missing fields"));
//   }

//   if (!name || !email || !phone) {
//     return next(
//       new HttpError(400, "Missing required field: name, email, or phone")
//     );
//   }

//   try {
//     const newContact = await Contact.create({
//       ...req.body,
//       owner,
//     });

//     res.status(201).json({
//       id: newContact._id,
//       name: newContact.name,
//       email: newContact.email,
//       phone: newContact.phone,
//       owner: newContact.owner,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const addContact = async (req, res, next) => {
//   const { _id: owner } = req.user;

//   const { name, email, phone, favorite } = req.body;

//   if (!name && !email && !phone && !favorite) {
//     return next(new HttpError(400, "Missing fields"));
//   }

//   if (!name || !email || !phone || !favorite) {
//     return next(
//       new HttpError(
//         400,
//         "Missing required field: name, email, favorite or phone"
//       )
//     );
//   }

//   try {
//     const newContact = await Contact.create({
//       ...req.body,
//       owner,
//     });

//     res.status(201).json({
//       id: newContact._id,
//       name: newContact.name,
//       email: newContact.email,
//       phone: newContact.phone,
//       owner: newContact.owner,
//       favorite: newContact.favorite,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const addContact = async (req, res, next) => {
//   const { _id: owner } = req.user;

//   const { name, email, phone, favorite } = req.body;

//   if (!name && !email && !phone && !favorite) {
//     return next(new HttpError(400, "Missing fields"));
//   }

//   if (!name || !email || !phone || !favorite) {
//     return next(
//       new HttpError(
//         400,
//         "Missing required field: name, email, favorite or phone"
//       )
//     );
//   }

//   try {
//     const newContact = await Contact.create({
//       ...req.body,
//       owner,
//     });

//     res.status(201).json({
//       id: newContact._id,
//       name: newContact.name,
//       email: newContact.email,
//       phone: newContact.phone,
//       owner: newContact.owner,
//       favorite: newContact.favorite,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { name, email, phone, favorite } = req.body;
  const missingFields = [];

  if (!name) {
    missingFields.push("name");
  }
  if (!email) {
    missingFields.push("email");
  }
  if (!phone) {
    missingFields.push("phone");
  }
  if (!favorite) {
    missingFields.push("favorite");
  }

  if (missingFields.length === 4) {
    return next(new HttpError(400, "Missing fields"));
  }

  if (missingFields.length > 0) {
    return next(
      new HttpError(400, `Missing required fields: ${missingFields.join(", ")}`)
    );
  }

  try {
    const newContact = await Contact.create({
      ...req.body,
      owner,
    });

    res.status(201).json({
      id: newContact._id,
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
      owner: newContact.owner,
      favorite: newContact.favorite,
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
};

const removeContact = async (req, res, next) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);

  if (!result) {
    return next(new HttpError(404, "Not found"));
  }

  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return next(new HttpError(400, "Missing fields"));
  }

  if (!name || !email || !phone) {
    return next(
      new HttpError(400, "Missing required field: name, email, or phone")
    );
  }

  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, {
      name,
      email,
      phone,
    });

    if (!updatedContact) {
      return next(new HttpError(404, "Not found"));
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const { error } = updateFavoriteSchema.validate({ favorite });

  if (error) {
    return next(new HttpError(404, "missing field favorite"));
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      return next(new HttpError(404, "Not found"));
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
