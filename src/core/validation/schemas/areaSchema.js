module.exports = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 4 },
    translation: { type: "object" },
  },
  required: ["name", "translation"],
  additionalProperties: false,
};
