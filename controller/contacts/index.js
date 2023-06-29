const service = require("../../service");
const Joi = require("joi");

const postContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().min(5),
}).or("name", "email", "phone");

const updateStatusSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const getContacts = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const isFavorite = req.query.favorite;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // console.log(req.user._id);
    // console.log(req.query);

    const results = await service.getAllContacts(
      owner,
      isFavorite,
      page,
      limit
    );
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const owner = req.user._id;

  try {
    const result = await service.getOneContact(contactId, owner);
    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const owner = req.user._id;
  try {
    const { error } = postContactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const result = await service.createContact({ name, email, phone, owner });
      res.status(201).json({
        status: "success",
        code: 201,
        data: { contact: result },
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const owner = req.user._id;

  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const result = await service.updateContact(contactId, owner, {
        name,
        email,
        phone,
      });
      if (result) {
        res.status(200).res.json({
          status: "success",
          code: 200,
          data: { contact: result },
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `Not found contact id: ${contactId}`,
          data: "Not Found",
        });
      }
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const owner = req.user._id;

  try {
    const { error } = updateStatusSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing field favorite" });
    } else {
      const result = await service.updateContact(contactId, owner, {
        favorite,
      });
      if (result) {
        res.status(200).json({
          status: "success",
          code: 200,
          data: { contact: result },
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `Not found contact id: ${contactId}`,
          data: "Not Found",
        });
      }
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const owner = req.user._id;

  try {
    const result = await service.removeContact(contactId, owner);
    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Contact deleted",
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getContacts,
  getContactById,
  create,
  update,
  updateStatus,
  remove,
};
