const { contactSchema } = require("../schemas");
const contactsOperations = require("../model");
const { BadRequest, NotFound } = require("http-errors");

const { sendSuccessRes } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await contactsOperations.listContacts();
  sendSuccessRes(res, { data: result });
  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     result: contacts,
  //   },
  // });
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperations.getContactById(id);

  if (!result) {
    throw new NotFound(`Id ${id} not found`);
    // const error = new Error(`Id ${id} not found`);
    // error.status = 404;
    // throw error;
  }
  sendSuccessRes(res, { data: result });

  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     result,
  //   },
  // });
};

const addContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
    // const err = new Error(error.message);
    // err.status = 400;
    // throw err;
  }
  const result = await contactsOperations.addContact(req.body);
  sendSuccessRes(res, { data: result }, 201);

  // res.status(201).json({
  //   status: "success",
  //   code: 201,
  //   data: {
  //     result,
  //   },
  // });
};

const updateContactById = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
    // const err = new Error(error.message);
    // err.status = 400;
    // throw err;
  }
  const { id } = req.params;
  const result = await contactsOperations.updateContactById(id, req.body);
  if (!result) {
    throw new NotFound(`Id ${id} not found`);
    // const error = new Error(`Id ${id} not found`);
    // error.status = 404;
    // throw error;
  }
  sendSuccessRes(res, { data: result });

  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     result,
  //   },
  // });
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperations.removeContact(id);
  if (!result) {
    throw new NotFound(`Id ${id} not found`);
    // const error = new Error(`Id ${id} not found`);
    // error.status = 404;
    // throw error;
  }
  sendSuccessRes(res, { message: "Success delete" });

  // res.json({
  //   status: "success",
  //   code: 200,
  //   message: "Success delete",
  // });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
