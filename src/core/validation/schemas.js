const userSchema = require("./schemas/userSchema");
module.exports = {
  usherSchema: {
      type: 'object',
      properties: {
        name: { type: "string", minLength: 4 },
        mobile: { type: "string", minLength: 4 },
        email: { type: "string", format: "email" },
      },
      required: ["name", "email", "mobile"],
      additionalProperties: false
  },
  userSchema,
};
