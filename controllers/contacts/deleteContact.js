import { removeContact } from "../../service/index.js";

export async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const isDelete = await removeContact(contactId);
    if (!isDelete) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: '${contactId}'`,
        data: "Not found",
      });
    }
    return res.json({
      status: "success",
      code: 200,
      data: { contact: isDelete },
      message: `Contact with id: '${contactId}' deleted`,
    });
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
