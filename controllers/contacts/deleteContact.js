import { removeContact } from "../../service/index.js";

export async function deleteContact(req, res, next) {
  const owner = req.user.id;
  const id = req.params.contactId;

  try {
    const isDelete = await removeContact({ owner, id });
    if (!isDelete) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: '${id}'`,
        data: "Not found",
      });
    }
    return res.json({
      status: "success",
      code: 200,
      data: { contact: isDelete },
      message: `Contact with id: '${id}' deleted`,
    });
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
