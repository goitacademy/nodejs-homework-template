export const handleValidationError = (err, res, next) => {
  if (err.name !== "ValidationError") {
    console.error(err.message);
    return next(err);
  }

  res.status(400).json({
    status: 400,
    statusText: "Bad Request",
    data: { message: err.message },
  });
};

export const handleContactNotFoundByIdError = (res, id) => {
  res.status(404).json({
    status: 404,
    statusText: "Not Found",
    data: { message: `Not found contact by id: ${id}` },
  });
};

export const handleUserUnauthorizedError = (res, message) => {
  res.status(401).json({
    status: 401,
    statusText: "Unauthorized",
    data: { message },
  });
};

export const handleUserConflictError = (res, ...user) => {
  const [isUserExists, username, email] = user;

  res.status(409).json({
    status: 409,
    statusText: "Conflict",
    data: {
      message: `${
        isUserExists.username === username
          ? "Username"
          : isUserExists.email === email
          ? "E-mail"
          : null
      } is already in use`,
    },
  });
};

export const handleUserNotFoundError = res => {
  res.status(404).json({
    status: 404,
    statusText: "Not Found",
    data: { message: "Verification unsuccessful, user not found" },
  });
};

export const handleUpdateAvatarError = (err, res) => {
  res.status(400).json({
    status: 400,
    statusText: "Bad Request",
    data: { message: err.message },
  });
};

export const handleEmailNotVerifiedError = res => {
  res.status(400).json({
    status: 400,
    statusText: "Bad Request",
    data: { message: "E-mail is not verified" },
  });
};

export const handleUserAlreadyBeenVerifiedError = res => {
  res.status(400).json({
    status: 400,
    statusText: "Bad Request",
    data: { message: "Verification has already been passed" },
  });
};
