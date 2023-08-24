import { param, body } from "express-validator";

const contactIdValidationChain = () =>
  param("contactId", "ContactId is not valid")
    .isString()
    .isLength({ min: 21, max: 21 })
    .withMessage("ContactId should be 21 chars")
    .notEmpty()
    .withMessage("ContactId is required");

const createContactNameValidationChain = () =>
  body("name", "Name is not valid")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name should be between 3 and 30 chars")
    .trim();

const createContactEmailValidationChain = () =>
  body("email", "Email is not valid")
    .isEmail()
    .isLength({ min: 8, max: 30 })
    .withMessage("Email should be between 8 and 30 chars")
    .trim();

const createContactPhoneValidationChain = () =>
  body("phone", "Phone number is not valid")
    .isMobilePhone()
    .isLength({ min: 8, max: 30 })
    .withMessage("Phone number should be between 8 and 30 chars")
    .trim();

export {
  contactIdValidationChain,
  createContactNameValidationChain,
  createContactEmailValidationChain,
  createContactPhoneValidationChain,
};
