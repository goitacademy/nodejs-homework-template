import { getContactById } from "#service/index.js";

export async function showContactById(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      return res.json({
        status: "success",
        code: 200,
        data: { contact: contact },
      });
    }
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
