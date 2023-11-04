import service from "../../service/schemas/contact.js";

async function deleteContacts(req, res, next) {
  try {
    const data = await service.removeContact(req.params.id);
    if (data) {
      return res.status(200).json({ message: "contact deleted" });
    }
    throw new Error("Not found");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
