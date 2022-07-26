"use strict"
import contactsActions from './contactsActions';
import contactsPath from './contactsDB';
import { IContactsDBModel } from '../../Interfaces/contactIterfaces';

const contactsDBModel: IContactsDBModel = {
    contactsActions,
    contactsPath,
}

export default contactsDBModel;