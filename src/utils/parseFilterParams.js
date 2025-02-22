const parseIsFavourite = (isFavourite) => {
  const isBoolean = typeof isFavourite === "boolean";
  if (!isBoolean) {
    return undefined;
  }

  return isFavourite;
};

const parseContactType = (contactType) => {
  const isString = typeof contactType === "string";
  if (!isString) return;

  const isContactType = (contactType) =>
    ["work", "home", "personal"].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

function parseFilterParams(query) {
  const { contactType, isFavourite } = query;

  const parsedType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
}

export { parseFilterParams };
