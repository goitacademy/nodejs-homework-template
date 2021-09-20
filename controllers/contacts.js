const { sendSuccessResponse, sendError } = require("../utils");
const contactsOperetaions = require("../model/contacts");

const getAll = async (req, res) => {
  const result = await contactsOperetaions.getAll();
  sendSuccessResponse(res, { result });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperetaions.getById(id);
  if (!result) {
    throw sendError.NotFound(id);
  }
  sendSuccessResponse(res, { result });
};

const add = async (req, res) => {
  const result = await contactsOperetaions.add(req.body);
  sendSuccessResponse(res, { result }, 201);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsOperetaions.updateById(id, req.body);
  if (!result) {
    throw sendError.NotFound(id);
  }
  sendSuccessResponse(res, { result });
};

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperetaions.removeById(id);
  if (!result) {
    throw sendError.NotFound(id);
  }
  sendSuccessResponse(res, { message: "Success delete" });
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
};
