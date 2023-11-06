import { removeContact } from "#services/index.js";

export async function deleteContacts(req, res, next) {
  try {
    const data = await removeContact(req.params.id);
    if (data) {
      return res.status(200).json({ message: "contact deleted" });
    }
    throw new Error("Not found");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
