const models = require("../models/index");

const Joi = require("joi");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await models.listContacts();
    res.status(200).json({
      status: "success",
      code: "200",
      message: "Contacts listed with success !!!",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      code: 500,
      message: "Contacts listing error...!",
    });
    next(error);
  }
};

const getContactsById = async (req, res, next) => {
  const id = req.params.contactId;
  // console.log(id);

  try {
    const contact = await models.getContactById(id);
    // console.table(contact);

    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id: ${id} does not exists...!`,
      });
    }

    res.status(201).json({
      status: "success",
      code: "201",
      message: `Contact with id: ${id}  found !!!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      code: 500,
      message: `Contact searching error...!`,
    });
    next(error);
  }
};

const nameSchema = Joi.object({
  // eslint-disable-next-line prefer-regex-literals
  name: Joi.string().pattern(new RegExp("^[a-zA-Z]{4,}(\\s+[a-zA-Z]+)*$")),
});

const emailSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "uk"] },
  }),
});

const phoneSchema = Joi.object({
  phone: Joi.string().pattern(/^[+]?[\d\s,./\\\-()]{9,}$/),
});

const createContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;

  const { error } = nameSchema.validate({ name: name });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    const { error } = emailSchema.validate({ email: email });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      const { error } = phoneSchema.validate({ phone: phone });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      } else {
        try {
          const newContact = await models.addContact({
            name: name,
            email: email,
            phone: phone,
            favorite: favorite,
          });

          res.status(201).json({
            status: "success",
            code: 201,
            message: `Success adding contact: name:${name}, email:${email}, phone:${phone} !`,
            data: newContact,
          });
        } catch (error) {
          res.status(500).json({
            status: "fail",
            code: 500,
            message: error.message,
          });
          next(error);
        }
      }
    }
  }
};

const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const deletedContact = await models.removeContact(id);
    if (!deletedContact) {
      res.status(404).json({ message: `contact with id:${id} not found` });
    } else {
      res.status(200).json({ message: `contact with id:${id} deleted` });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      code: 500,
      message: "Error deleting contact...!",
    });
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const id = req.params.contactId;
  const { name, email, phone } = req.body;

  // Check for at least one field to update
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }

  const updatedElements = {};

  // Validate name if provided
  if (name || name !== undefined) {
    const { error } = nameSchema.validate({ name: name });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    updatedElements.name = name;
  }

  // Validate email if provided
  if (email || email !== undefined) {
    const { error } = emailSchema.validate({ email: email });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    updatedElements.email = email;
  }

  // Validate phone if provided
  if (phone || phone !== undefined) {
    const { error } = phoneSchema.validate({ phone: phone });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    updatedElements.phone = phone;
  }

  try {
    const updatedContact = await models.updateContact(id, {
      ...updatedElements,
    });

    if (!updatedContact) {
      return res
        .status(404)
        .json({ message: "Contact for update is not found...!" });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: `Success updating contact with id:${id}...!`,
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({
      status: "fail",
      code: 500,
      message: "Error updating contact...!",
    });
    next(error);
  }
};

const updateFavoriteStatus = async (req, res, next) => {
  const id = req.params.contactId;
  const { favorite = false } = req.body;

  try {
    // console.log(id);

    const result = await models.updateContact(id, { favorite });

    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: result,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found Contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactsById,
  createContact,
  deleteContact,
  updateContact,
  updateFavoriteStatus,
};
