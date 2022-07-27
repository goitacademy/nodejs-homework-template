import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";


const updateStatusContact = async (req: Request, res: Response) => {
    const { body } = req;
    const { error } = Contact.outerSchema.validatePatchFavorite(body);
    if (error) {
        throw createError(400, error.message);
    }
    const { contactId } = req.params;
    console.log("before  update servise");

    const result = await Contact.model.findByIdAndUpdate(contactId, body, { new: true });
    if (!result) {
        throw createError(404);
    }
    res.json(result);
}

export default updateStatusContact; 