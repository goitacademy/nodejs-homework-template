export default {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "REST API DOCS",
      version: "1.0.0",
      description: "Contacts service API DOCS",
    },
    securityScheme: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development  server",
      },
      {
        url: process.env.BASE_URL,
        description: "Production  server",
      },
    ],
    consumes: ["application/json", "multipart/form-data"],
    produces: ["application/json"],
    tags: [
      {
        name: "Auth",
        description: "Authorization endpoint",
      },
      {
        name: "Contacts",
        description: "Contacts operations endpoint",
      },
    ],
    paths: {
      "/api/contacts": {
        get: {
          parameters: [],
          security: [{ bearerAuth: [] }],
          tags: ["Contacts"],
          summary: "Get all contacts",
          description:
            "Returns all contacts from the system that the user has access to",
          responses: {
            "200": {
              description: "A list of contacts.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/GetAllContactResponse",
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorUnauthorizedResponse",
                  },
                },
                example: {
                  message: "Authentication failed. Please log in",
                },
              },
            },
            "500": {
              description: "Unexpected error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/GeneralServerErrorResponse",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Contacts"],
          summary: "Create a new contact",
          security: [
            {
              Bearer: [],
            },
          ],
          requestBody: {
            description: "Create object",
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  $ref: "#/components/schemas/CreateContactRequest",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Contact successfully created",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CreateContactResponse",
                  },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorBadRequest",
                  },
                },
                example: {
                  message: "Missing field",
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorUnauthorizedResponse",
                  },
                },
                example: {
                  message: "Authentication failed. Please log in",
                },
              },
            },
            "404": {
              description: "Not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorNotFoundResponse",
                  },
                },
                example: {
                  message: "Not found resource",
                },
              },
            },
            "409": {
              description: "Conflict",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorConflictResponse",
                  },
                },
                example: {
                  message: "Contact with such email already exist",
                },
              },
            },
            "500": {
              description: "Unexpected error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/GeneralServerErrorResponse",
                  },
                },
              },
            },
          },
        },
        patch: {
          tags: ["Auth"],
          summary: "Update user subscription",
          description: "Update user subscription",
        },
      },

      "/api/contacts/:contactId": {
        get: {
          tags: ["Contacts"],
          description: "fkkfk",
          summary: "Get contacts by Id",
          responses: {
            "200": {
              description: "A list of pets.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/GetContact",
                  },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/",
                  },
                },
                example: {
                  message: "Id is not valid",
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorUnauthorizedResponse",
                  },
                },
                example: {
                  message: "Authentication failed. Please log in",
                },
              },
            },
            "404": {
              description: "Not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorNotFoundResponse",
                  },
                },
                example: {
                  message: "Not found resource",
                },
              },
            },
            "500": {
              description: "Unexpected error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/GeneralServerErrorResponse",
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Contacts"],
          summary: "Delete contact",
          description: "Delete contact",
          responses: {
            "200": {
              description: "Contact successfully deleted",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        description: "contact was successfully deleted",
                        example: "contact was successfully deleted",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorBadRequest",
                  },
                },
                example: {
                  message: "Invalid id",
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorUnauthorizedResponse",
                  },
                },
                example: {
                  message: "Authentication failed. Please log in",
                },
              },
            },
            "404": {
              description: "Not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorNotFoundResponse",
                  },
                },
                example: {
                  message: "Not found resource",
                },
              },
            },
            "500": {
              description: "Unexpected error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/GeneralServerErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/contacts/:contactId/favorite": {
        patch: {
          tags: ["Contacts"],
          summary: "Update contact",
        },
      },
      "/users/signup": {
        post: {
          tags: ["Auth"],
          summary: "Signup user",
        },
      },

      "/users/signin": {
        post: {
          tags: ["Auth"],
          summary: "Signin user",
        },
      },
      "/users/signout": {
        get: {
          tags: ["Auth"],
          summary: "Signout user",
        },
      },
      "/users/verify/:verificationToken": {
        get: {
          tags: ["Auth"],
          summary: "Verification letter for user email",
        },
      },
      "/users/verify": {
        get: {
          tags: ["Auth"],
          summary: "Repead user verify",
        },
      },
      "/users/avatars": {
        patch: {
          tags: ["Auth"],
          summary: "Update user avatar",
          description: "Update user avatar",
        },
      },

      "/users/current": {
        get: {
          tags: ["Auth"],
          summary: "Get current user",
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        CreateContactRequest: {
          type: "object",
          required: ["name", "email", "phone", "avatar"],
          properties: {
            name: {
              type: "string",
              description: "Contact`s name",
            },
            email: {
              type: "string",
              description: "Contact`s email",
              format: "email",
            },
            phone: {
              type: "number",
              description: "Contact`s phone number",
            },
            avatar: {
              type: "string",
              format: "binary",
              description: "Contact`s avatar",
            },

            favorite: {
              type: "boolean",
              description: "Is contact favorite",
              default: false,
            },
          },
        },
        CreateContactResponse: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Contact`s name",
            },
            email: {
              type: "string",
              description: "Contact`s email",
            },
            phone: {
              type: "string",
              description: "Contact`s phone",
            },
            favorite: {
              type: "boolean",
            },
            avatar: {
              type: "string",
              description: "Contact`s avatar",
            },
            owner: {
              type: "string",
              description: "Contact`s owner",
            },
            _id: {
              type: "string",
              description: "Contact`s _id",
            },
            createdAt: {
              type: "string",
              format: "date",
              description: "createdAt",
            },
            updatedAt: {
              type: "string",
              format: "date",
              description: "updatedAt",
            },
          },
        },
        GetAllContactResponse: {
          type: "object",
          properties: {
            result: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Contact`s name",
                  },
                  email: {
                    type: "string",
                    description: "Contact`s email",
                  },
                  phone: {
                    type: "string",
                    description: "Contact`s phone number",
                  },
                  favorite: {
                    type: "string",
                    description: "Contact`s _id",
                  },
                  avatar: {
                    type: "string",
                    description: "Contact`s _id",
                  },
                  owner: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        description: "Contact`s _id",
                      },
                      email: {
                        type: "string",
                        description: "email",
                      },
                      subscription: {
                        type: "string",
                      },
                    },
                  },
                  _id: {
                    type: "string",
                    description: "Contact`s _id",
                  },
                },
              },
            },
            total: {
              type: "number",
            },
            per_page: {
              type: "number",
            },
          },
        },
        GetContact: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Contact`s name",
            },
            email: {
              type: "string",
              description: "Contact`s email",
            },
            phone: {
              type: "string",
              description: "Contact`s phone number",
            },
            favorite: {
              type: "string",
              description: "Contact`s _id",
            },
            avatar: {
              type: "string",
              description: "Contact`s _id",
            },
            owner: {
              type: "string",
              description: "owner",
            },
            _id: {
              type: "string",
              description: "Contact`s _id",
            },
          },
        },
        GeneralServerErrorResponse: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              description: "Internal server error",
              example: "500",
            },
            message: {
              type: "string",
              description: " Error message",
              example: "Server Error",
            },
          },
        },
        ErrorConflictResponse: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              description: "Error status code",
              example: "409",
            },
            message: {
              type: "string",
              description: " Error message",
              example: "User with email - user@example.com, already exist",
            },
          },
        },
        ErrorUnauthorizedResponse: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              description: "Error status code",
              example: "401",
            },
            message: {
              type: "string",
              description: " Error message",
              example: "Not authorized",
            },
          },
        },
        ErrorNotFoundResponse: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              description: "Error status code",
              example: "404",
            },
            message: {
              type: "string",
              description: "Error message",
              example: "Not found",
            },
          },
        },
        ErrorRemoveContactResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "failure",
            },
          },
          code: { type: "integer", example: "409" },
          message: {
            type: "string",
            description: "Error message",
            example: "The contact you are trying to delete is not exist",
          },
        },
        ErrorBadRequest: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              description: "Error status code",
              example: "400",
            },

            message: {
              type: "string",
              description: "Error message",
              example: "Bad request",
            },
          },
        },
      },
    },
    security: {
      bearerAuth: [],
    },
  },
  apis: [
    "./routes/api/auth-contacts-router.ts",
    "./models/Contact.ts",
    "./routes/api/contacts-router.ts",
    "./models/User.ts",
  ],
};
