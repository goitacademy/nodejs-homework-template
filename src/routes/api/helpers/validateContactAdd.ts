"use strict"
import { TContactAdd, contactAddShema } from '../../../Interfaces/contactIterfaces'

export const validateContactAdd = <С extends TContactAdd>(contact: С) => {
    return contactAddShema.validate(contact);
}


