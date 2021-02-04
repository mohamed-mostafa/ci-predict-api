module.exports = {
  type: "object",
  properties: {
    products: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },
          selectedOption: { type: "string" },
          amount: { type: "number" },
        },
        required: ["_id", "selectedOption", "amount"],
      },
    },
    address: { type: "string" },
    total: { type: "number" },
  },
  required: ["products", "address", "total"],
  additionalProperties: false,
};
