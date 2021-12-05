module.exports = {
  register: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6, maxLength: 64 },
      mobile: { type: "string" },
      title: { type: "string" },
      city: { type: "string" },
      state: { type: "string" },
      zip: { type: "string" },
      address: { type: "string" },
    },
    required: ["firstName", "lastName", "password", "email", "mobile", "title"],
    additionalProperties: false,
  },
  login: {
    type: "object",
    properties: {
      username: { type: "string" },
      password: { type: "string", minLength: 6, maxLength: 64 },
    },
    required: ["username", "password"],
    additionalProperties: false,
  },
  resetPassword: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
    },
    required: ["email"],
    additionalProperties: false,
  },
  verifyResetPassword: {
    type: "object",
    properties: {
      id: { type: "string", pattern: "^[0-9a-fA-F]{24}$" },
      token: { type: "string", minLength: 4, maxLength: 4 },
    },
    required: ["id", "token"],
    additionalProperties: false,
  },
};
