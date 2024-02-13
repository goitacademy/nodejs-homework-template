import { updateContact } from "../../service/index.js";
import { validateUpdateContact } from "../../validator.js";

export async function updateExistContact(req, res, next) {
  const { contactId } = req.params;
  const fields = req.body;
  const { error } = validateUpdateContact(req.body);
  try {
    if (error) {
      console.log(error);
      return res.json({ status: 400, msg: "Missing fields" });
    }
    const result = await updateContact(contactId, fields);
    if (result) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: "Not found",
    });
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
