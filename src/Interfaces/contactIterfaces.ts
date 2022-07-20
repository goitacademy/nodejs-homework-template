"use strict"

import { InterfaceFrom } from "types-joi";
import Joi from "types-joi";

export const contactAddShema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

export type TContactAdd = InterfaceFrom<typeof contactAddShema>;

export interface IContactGet {
    readonly id: string,
    name: string,
    email: string,
    phone: string,
}

export interface IContactAdd {
    name: string,
    email: string,
    phone: string,
}

export interface IContactActions {
    listContacts: () => Promise<IContactGet[] | null>,
    getContactsById: (id: string) => Promise<IContactGet | null>,
    addContact: ({ name, email, phone }: IContactAdd) => Promise<IContactGet>,
    deleteContactById: (id: string) => Promise<IContactGet | null>,
    updateContact: (id: string, { name, email, phone }: IContactAdd) => Promise<IContactGet | null>,
}

export interface IContactsDBModel {
    contactsActions: IContactActions,
    contactsPath: string,
}

