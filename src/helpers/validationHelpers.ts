import joi, { ValidationResult } from "joi";
import { IContact, IUser } from ".";

const ID_LENGTH: number = 24;

const validateObject = (
  contact: IContact | IUser,
  joiSchema: joi.ObjectSchema<any>,
  requiredFields: string[] = []
): ValidationResult => {
  let objectSchema: joi.ObjectSchema<any> = Object.create(joiSchema);

  objectSchema = objectSchema.fork(requiredFields, (field) => field.required());

  return objectSchema.validate(contact);
};

export { validateObject, ID_LENGTH };
