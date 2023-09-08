import {
  listContacts,
  addContact,
  removeContact,
  getContactById,
  updateContact,
} from "../models/contacts.js";

export const get = async (req, res, next) => {
  const { page = 1, limit = 10, favorite } = req.query;
  const filters = {};

  if (favorite !== undefined) {
    filters.favorite = favorite === "true";
  }
  const { id: userID } = req.user;
  try {
    const contacts = await listContacts(page, limit, filters, userID);
    res.json({
      message: "response ok",
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (err) {
    console.error("Error while reading contacts");
    next(err);
  }
};

export const getById = async (req, res, next) => {
  const { id } = req.params;
  const { id: userID } = req.user;
  try {
    const contact = await getContactById(id, userID);
    if (contact) {
      res.json({
        message: "contact found",
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not Found contact with id ${id}`,
        data: "not found",
      });
    }
  } catch (err) {
    console.error("Error while reading contacts");
    next(err);
  }
};

export const add = async (req, res, next) => {
  const body = req.body;
  const { id: userID } = req.user;

  try {
    const contact = await addContact(body, userID);
    res.json({
      message: "contact added",
      status: "success",
      code: 201,
      data: contact,
    });
  } catch (err) {
    console.error("Error while posting contacts");
    next(err);
  }
};

export const remove = async (req, res, next) => {
  const { id } = req.params;
  const { id: userID } = req.user;

  try {
    const contact = await removeContact(id, userID);
    if (contact) {
      res.json({
        message: "contact deleted",
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error("Error while deleting contacts");
    next(err);
  }
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const { id: userID } = req.user;

  try {
    const contact = await updateContact(id, body, userID);

    if (contact) {
      res.json({
        message: "contact updated",
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact with id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error("Error while updating contacts:", err);
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { favorite = false } = req.body;
  const { id: userID } = req.user;

  try {
    const contact = await updateContact(id, { favorite }, userID);

    if (contact) {
      res.json({
        message: "status updated",
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      res.status(404).json({
        message: "Contact not found",
        status: "error",
        code: 404,
      });
    }
  } catch (err) {
    console.error("Error while updating contacts:", err);
    next(err);
  }
};
