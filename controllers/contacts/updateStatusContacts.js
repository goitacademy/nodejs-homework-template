import { updateStatusContact } from "../../models/contacts.js";

const patchContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const body = { favorite };
    if (body) {
      const renameContact = await updateStatusContact(contactId, body);
      return res.json({ status: 200, message: renameContact });
    } else {
      return res.json({ status: 400, message: "missing field favorite" });
    }
  } catch (err) {}
};
export { patchContact };
