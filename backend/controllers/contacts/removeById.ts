import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";

const removeById = async (req: Request, res: Response) => {
    const { contactId } = req.params;
    const result = await Contact.model.findByIdAndRemove(contactId);
    if (!result) {
        throw createError({ status: 404 });
    }
    res.json(result);
}

export default removeById;