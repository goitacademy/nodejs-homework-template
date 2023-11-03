const method = require("../models/contacts");
const { HttpError, ControllerWrap } = require("../helpers");

async function getAll(req, res, next) {
  const answer = await method.listContacts();
  res.json(answer);
}

async function getById(req, res, next) {
  const { contactId } = req.params;
  const answer = await method.getContactById(contactId);

  if (!answer) {
    throw HttpError(404, "Not found");
  }

  res.json(answer);
}

async function postItem(req, res, next) {
  const answer = await method.addContact(req.body);
  return res.status(201).json(answer);
}

async function deleteItem(req, res, next) {
  const { contactId } = req.params;
  const answer = await method.removeContact(contactId);

  if (!answer) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Delete success!" });
}

async function putItem(req, res, nex) {
  const { contactId } = req.params;
  const answer = await method.updateContact(contactId, req.body);

  if (!answer) {
    throw HttpError(404, "Not found");
  }

  res.json(answer);
}

async function patchItem(req, res, next) {
  const { contactId } = req.params;
  const answer = await method.changeContact(contactId, req.body);

  if (!answer) {
    throw HttpError(404, "Not found");
  }

  res.json(answer);
}

module.exports = {
  getAll: ControllerWrap(getAll),
  getById: ControllerWrap(getById),
  postItem: ControllerWrap(postItem),
  deleteItem: ControllerWrap(deleteItem),
  putItem: ControllerWrap(putItem),
  patchItem: ControllerWrap(patchItem),
};
