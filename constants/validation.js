export const VALIDATION = {
  name: {
    pattern: /^\s*[A-Z][a-z]+(\s+[A-Z][a-z]+)?\s*$/,
    message: [
      "First name and last name (optional)",
      "must contain only latin letters,",
      "start with a capital",
      "and be at least 2 characters long",
    ].join(" "),
  },
  phone: {
    pattern: /^([\s-]*\d[\s-]*){10}$/,
    message: [
      "Phone must be 10 digits long",
      "and may contain spaces and hyphens",
    ].join(" "),
  },
  email: {
    pattern: /^\s*\S+@\S+\.\S+\s*$/,
    message: "Invalid email",
  },
};
