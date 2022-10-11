const service = require("../servisce");

const get = async (req, res, next) => {
  try {
    const contacts = await service.getAllContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await service.getByIdContact(req.params.id);
    if (contact) {
      res.status(200).json(contact);
      return;
    }
    throw new Error("Not found");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req, res, next) => {
  try {
    const newContact = await service.createContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res, next) => {
  try {
    const data = await service.removeContact(req.params.id);
    if (data) {
      res.status(200).json({ message: "contact deleted" });
      return;
    }
    throw new Error("Not found");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const putContact = await service.updateContact(id, body);
    res.status(200).json({ ...putContact["_doc"], ...body });
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed for value")) {
      res.status(400).json({ message: `Not found this id: ${id}` });
      return;
    }

    res.status(404).json({ message: error.message });
  }
};

const favorite = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: "missing field favorite" });
      return;
    }

    const data = await service.updateStatusContact(id, body);
    res.status(200).json({ ...data["_doc"], ...body });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = { get, getById, create, remove, update, favorite };
