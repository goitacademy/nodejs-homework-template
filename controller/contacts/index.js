const service = require("../../service");
const Joi = require("joi");

const newContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
  favourite: Joi.boolean().required,
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().min(5),
  favourite: Joi.boolean(),
}).or("name", "email", "phone", "favourite");

const get = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const results = await service.getAllContacts();
    //   req.user._id,
    //   req.query.favorite,
    //   page,
    //   limit
    // );
    // res.status(200).json(results);
    // console.log(results);
    console.log("contacts getted!");
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

const getById = async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.user.id);

  try {
    const result = await service.getContactById(req.params.id, req.user.id);
    if (result) {
      res.status(200).json(result);

      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone, favourite } = req.body;
  const owner = req.user._id;

  try {
    const result = await service.createContact({
      name,
      email,
      phone,
      favourite,
      owner,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, favourite } = req.body;
  const owner = req.user._id;

  try {
    const result = await service.updateContact(id, owner, {
      name,
      email,
      phone,
      favourite,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { favourite = false } = req.body;
  const owner = req.user._id;

  try {
    const result = await service.updateContact(id, owner, { favourite });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user._id;

  try {
    const result = await service.removeContact(id, owner);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
