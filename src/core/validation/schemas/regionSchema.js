module.exports = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 4 },
    deliveryFees: { type: "number" },
    translation: { type: "object" },
  },
  required: ["name", "deliveryFees", "translation"],
  additionalProperties: false,
};
