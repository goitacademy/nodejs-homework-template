import { validateUpdateFavorite } from "../../validator.js";
import { updateStatusContact } from "../../service/index.js";

export async function updateStatus(req, res, next) {
  const { contactId } = req.params;
  const { favourite = false } = req.body;
  const { error } = validateUpdateFavorite(req.body);

  try {
    if (error) {
      return res.json({ status: 400, msg: "Missing field favorite" });
    }
    const result = await updateStatusContact(contactId, { favourite });

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
