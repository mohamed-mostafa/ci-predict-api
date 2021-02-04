module.exports = {
  type: "object",
  properties: {
    category: { type: "string" },
    options: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 4 },
          unit: { type: "string" },
          increasingAmount: { type: "number" },
          pricePerUnit: { type: "number" },
          translation: { type: "object" },
          active: { type: "boolean" },
        },
        required: [
          "name",
          "unit",
          "increasingAmount",
          "pricePerUnit",
          "translation",
          "active",
        ],
        additionalProperties: false,
      },
      minItems: 1,
    },
    active: { type: "boolean" },
  },
  required: ["category", "options", "active"],
};
