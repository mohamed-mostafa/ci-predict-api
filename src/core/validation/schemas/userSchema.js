module.exports = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 4 },
    password: { type: "string", minLength: 6, maxLength: 64 },
    mobile: { type: "string", minLength: 4 },
    email: { type: "string", format: "email" },
    code: { type: "string"},
    fcm_token: { type: "string"},
  },
  required: ["name", "password", "email", "mobile"],
  additionalProperties: false,
};
