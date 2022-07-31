import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";

const put = async (req: Request, res: Response) => {
    const { body } = req;
    const { error } = Contact.outerSchema.validateContactAdd(body);
    if (error) {
        throw createError(400);
    }

    const { contactId } = req.params;

    const result = await Contact.model.findByIdAndUpdate(contactId, body, { new: true });
    if (!result) {
        throw createError(404);
    }

    res.status(200).json(result);
}

export default put;