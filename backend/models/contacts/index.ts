"use strict"
export { TContactAdd } from './typesTS';

import model from './Contact';
import outerSchema from './outerSchema';

const Contact = {
    model,
    outerSchema
}

export default Contact;