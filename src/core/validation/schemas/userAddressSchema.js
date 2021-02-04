module.exports = {
  type: "object",
  properties: {
    name: { type: "string" },
    region: { type: "string" },
    apartment: { type: "string" },
    description: { type: "string" },
  },
  required: ["name", "region", "apartment", "description"],
  additionalProperties: false,
};
