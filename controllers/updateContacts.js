import service from "../../service/schemas/contact.js";

async function updateContacts(req, res, next) {
  const { id } = req.params;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
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
}
