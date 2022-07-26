"use strict"

import { InterfaceFrom } from "types-joi";
import Joi from "types-joi";


export const contactAddShema = Joi.object({
    name: Joi.string().required(),
    /*     a valid email address string
        must have two domain parts e.g. example.com
        TLD must be .com or .net
     */
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
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

